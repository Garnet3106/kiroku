import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Ui from '../../../ui';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ContentArea from '../../ContentArea';
import Redux from '../../../redux/redux';
import { navigationActions } from '../../../redux/slices/navigation';
import { NavigationRoutePath } from '../../../navigation';
import Dialog from 'react-native-dialog';
import { useState } from 'react';
import { t } from '../../../translations';

export type TaskItemProps = Ui.LayoutProps & {
  style?: StyleProp<ViewStyle>,
};

export default function TaskItem(props: TaskItemProps) {
  const [startDialogVisibility, setStartDialogVisibility] = useState(false);

  return (
    <>
    <ContentArea
      style={[
        styles.container,
        { marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined },
        props.style,
      ]}
      onPress={() => setStartDialogVisibility(true)}
    >
      <View style={styles.block}>
        <Entypo name='book' color={Ui.color.black} size={20} top={2} style={{ marginRight: 2 }} />
        <Text style={styles.title}>
          作業タイトル
        </Text>
      </View>
      <View style={styles.block}>
        <MaterialIcons name='access-time' color={Ui.color.gray} size={20} top={1} />
        <Text style={styles.status}>
          {t('home.taskItem.minutesLeft', { min: 10 })}
        </Text>
        <Entypo name='chevron-right' color={Ui.color.gray} size={30} top={1} />
      </View>
    </ContentArea>
    <Dialog.Container visible={startDialogVisibility}>
      <Dialog.Title>
        {t('home.taskItem.startTask')}
      </Dialog.Title>
      <Dialog.Description>
        {t('home.taskItem.dialog.doYouReallyTackle', { taskTitle: '作業タイトル' })}
      </Dialog.Description>
      <Dialog.Button label={t('home.taskItem.dialog.cancel')} onPress={() => setStartDialogVisibility(false)} />
      <Dialog.Button label={t('home.taskItem.dialog.start')} onPress={() => {
        setStartDialogVisibility(false);
        start();
      }} />
    </Dialog.Container>
    </>
  );

  function start() {
    Ui.showToast(t('home.taskItem.toast.taskStarted'));
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
    color: Ui.color.gray,
    marginLeft: 3,
    marginRight: 4,
  },
});
