import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Ui from '../../../ui';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import ContentArea from '../../ContentArea';
import Redux from '../../../redux/redux';
import { navigationActions } from '../../../redux/slices/navigation';
import { NavigationRoutePath } from '../../../navigation';
import Dialog from 'react-native-dialog';
import { useState } from 'react';
import { t } from '../../../translations';
import { Task } from '../../../task';
import { useSelector } from 'react-redux';
import { taskInProgressActions } from '../../../redux/slices/taskInProgress';

export type TaskItemProps = Ui.LayoutProps & {
  task: Task,
  style?: StyleProp<ViewStyle>,
};

export default function TaskItem(props: TaskItemProps) {
  const taskInProgress = useSelector((state: Redux.RootState) => state.taskInProgress);
  const inProgress = props.task.id === taskInProgress?.id;
  const isOtherTaskInProgress = taskInProgress && !inProgress;

  const dailyWorkingStats = useSelector((state: Redux.RootState) => state.dailyWorkingStats);
  // comonnize as a function
  const workingStats = dailyWorkingStats ? (dailyWorkingStats.tasks[props.task.id] ?? null) : null;
  const remainingMinutes = (workingStats?.targetTime ?? 0) - (workingStats?.totalWorkingTime ?? 0);

  const [startDialogVisibility, setStartDialogVisibility] = useState(false);

  let color = Ui.color.gray;

  if (inProgress) {
    color = taskInProgress.stopped ? Ui.color.orange : Ui.color.main;
  }

  return (
    <>
    <ContentArea
      style={[
        styles.container,
        { marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined },
        props.style,
      ]}
      onPress={onPress}
    >
      <View style={styles.block}>
        <Entypo name='book' color={Ui.color.black} size={20} top={2} style={{ marginRight: 2 }} />
        <Text style={styles.title}>
          {props.task.title}
        </Text>
      </View>
      <View style={styles.block}>
        <MaterialIcons name='access-time' color={color} size={20} top={1} />
        <Text style={[
          styles.status,
          {
            color: color,
            fontWeight: inProgress ? 'bold' : undefined,
          },
        ]}>
          {
            remainingMinutes > 0 ? (
              t('home.taskItem.minutesLeft', { min: remainingMinutes })
            ) : (
              t('home.taskItem.completed')
            )
          }
        </Text>
        <Entypo
          name='chevron-right'
          color={color}
          size={30}
          top={1}
          style={{ opacity: inProgress || !isOtherTaskInProgress ? 1 : 0 }}
        />
      </View>
    </ContentArea>
    <Dialog.Container visible={startDialogVisibility}>
      <Dialog.Title>
        {t('home.taskItem.startTask')}
      </Dialog.Title>
      <Dialog.Description>
        {t('home.taskItem.dialog.doYouReallyTackle', { taskTitle: props.task.title })}
      </Dialog.Description>
      <Dialog.Button label={t('home.taskItem.dialog.cancel')} onPress={() => setStartDialogVisibility(false)} />
      <Dialog.Button label={t('home.taskItem.dialog.start')} onPress={() => {
        setStartDialogVisibility(false);
        start();
      }} />
    </Dialog.Container>
    </>
  );

  function onPress() {
    if (isOtherTaskInProgress) {
      Ui.showToast(t('home.taskItem.toast.finishCurrentTask'), {
        backgroundColor: Ui.color.red,
        showsLong: true,
      });
      return;
    }

    if (inProgress) {
      Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.TaskInProgress));
      return;
    }

    setStartDialogVisibility(true);
  }

  function start() {
    if (!inProgress) {
      Redux.store.dispatch(taskInProgressActions.start(props.task.id));
      Ui.showToast(t('home.taskItem.toast.taskStarted'));
    }

    Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.TaskInProgress));
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  block: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
  },
  status: {
    marginLeft: 3,
    marginRight: 4,
  },
});
