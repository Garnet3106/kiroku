import { StyleSheet, Text, View } from 'react-native';
import { NavigationRoutePath } from '../../navigation';
import ContentArea from '../ContentArea';
import RouteContainer from '../RouteContainer';
import { Entypo, Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Ui from '../../ui';
import Redux from '../../redux/redux';
import { navigationActions } from '../../redux/slices/navigation';
import { useEffect, useMemo, useState } from 'react';
import Dialog from 'react-native-dialog';
import { t } from '../../translations';
import { taskInProgressActions } from '../../redux/slices/taskInProgress';
import { useSelector } from 'react-redux';
import { Seconds } from '../../task';
import { workingResultActions } from '../../redux/slices/workingResult';

const progressBarHeight = 13;

export default function TaskInProgress() {
  const tasks = useSelector((state: Redux.RootState) => state.tasks);
  const taskInProgress = useSelector((state: Redux.RootState) => state.taskInProgress);
  const targetTask = useMemo(() => tasks.find((v) => v.id === taskInProgress?.id) ?? null, [tasks, taskInProgress?.id]);
  const [stopDialogVisibility, setStopDialogVisibility] = useState(false);
  const [resumeDialogVisibility, setResumeDialogVisibility] = useState(false);
  const [finishDialogVisibility, setFinishDialogVisibility] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<Seconds>(0);

  useEffect(() => {
    if (!taskInProgress || taskInProgress.stopped) {
      return;
    }

    const interval = setInterval(() => setElapsedSeconds((state) => state + 1), 1000);
    return () => clearInterval(interval);
  }, [taskInProgress]);

  if (!taskInProgress || !targetTask) {
    return;
  }

  // add past working time
  const remainingMinutes = Math.floor(targetTask.targetTime - (elapsedSeconds / 60) + 1);
  const remainingTimeRatio = Math.floor(((elapsedSeconds / 60) / targetTask.targetTime) * 100);

  const remainingTime = remainingMinutes < 0 ? (
    t('taskInProgress.ranOverMinutes', { min: -remainingMinutes })
  ) : (
    t('taskInProgress.minutesLeft', { min: remainingMinutes })
  );

  const stopOrResumeControlItem = taskInProgress.stopped ? (
    <ContentArea style={styles.controlItem} onPress={() => setResumeDialogVisibility(true)}>
      <Entypo name='controller-play' size={35} style={{ margin: -2 }} />
      <Text style={styles.controlItemText}>
        {t('taskInProgress.operation.resume')}
      </Text>
    </ContentArea>
  ) : (
    <ContentArea style={styles.controlItem} onPress={() => setStopDialogVisibility(true)}>
      <FontAwesome name='coffee' size={31} />
      <Text style={styles.controlItemText}>
        {t('taskInProgress.operation.stop')}
      </Text>
    </ContentArea>
  );

  return (
    <RouteContainer path={NavigationRoutePath.TaskInProgress} title={t('taskInProgress.taskInProgress')}>
      <View style={styles.container}>
        <ContentArea style={styles.information}>
          <View style={styles.top}>
            <Text style={styles.status}>
              {t('taskInProgress.working')}
            </Text>
            <Text style={styles.time}>
              {formatElapsedTime()}
            </Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.description}>
              <View style={styles.descriptionLeft}>
                <Entypo name='book' color={Ui.color.black} size={20} top={3} style={{ marginRight: 2 }} />
                <Text style={styles.title}>
                  {targetTask.title}
                </Text>
              </View>
              <Text style={[
                styles.remainingTime,
                { color: remainingMinutes < 0 ? Ui.color.red : '#000000' },
              ]}>
                {remainingTime}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressBarFillLeft,
                { width: `${remainingTimeRatio}%` },
              ]} />
              <View style={[
                styles.progressBarFillRight,
                { width: `${100 - remainingTimeRatio}%` },
              ]} />
            </View>
          </View>
        </ContentArea>
        <View style={styles.controls}>
          <ContentArea style={styles.controlItem} onPress={minimize}>
            <Feather name='minimize-2' size={30} />
            <Text style={styles.controlItemText}>
              {t('taskInProgress.operation.minimize')}
            </Text>
          </ContentArea>
          {stopOrResumeControlItem}
          <ContentArea style={styles.controlItem} onPress={() => setFinishDialogVisibility(true)}>
            <MaterialIcons name='exit-to-app' size={32} />
            <Text style={styles.controlItemText}>
              {t('taskInProgress.operation.finish')}
            </Text>
          </ContentArea>
        </View>
      </View>
      <Dialog.Container visible={stopDialogVisibility}>
        <Dialog.Title>
          {t('taskInProgress.taskInProgress')}
        </Dialog.Title>
        <Dialog.Description>
          {t('taskInProgress.dialog.doYouReallyStopWorking')}
        </Dialog.Description>
        <Dialog.Button label={t('taskInProgress.dialog.cancel')} onPress={() => setStopDialogVisibility(false)} />
        <Dialog.Button label={t('taskInProgress.dialog.stop')} onPress={() => {
          setStopDialogVisibility(false);
          stop();
        }} />
      </Dialog.Container>
      <Dialog.Container visible={resumeDialogVisibility}>
        <Dialog.Title>
          {t('taskInProgress.taskInProgress')}
        </Dialog.Title>
        <Dialog.Description>
          {t('taskInProgress.dialog.doYouReallyResumeWorking')}
        </Dialog.Description>
        <Dialog.Button label={t('taskInProgress.dialog.cancel')} onPress={() => setResumeDialogVisibility(false)} />
        <Dialog.Button label={t('taskInProgress.dialog.resume')} onPress={() => {
          setResumeDialogVisibility(false);
          resume();
        }} />
      </Dialog.Container>
      <Dialog.Container visible={finishDialogVisibility}>
        <Dialog.Title>
          {t('taskInProgress.taskInProgress')}
        </Dialog.Title>
        <Dialog.Description>
          {t('taskInProgress.dialog.doYouReallyFinishWorking')}
        </Dialog.Description>
        <Dialog.Button label={t('taskInProgress.dialog.cancel')} onPress={() => setFinishDialogVisibility(false)} />
        <Dialog.Button label={t('taskInProgress.dialog.finish')} onPress={() => {
          setFinishDialogVisibility(false);
          finish();
        }} />
      </Dialog.Container>
    </RouteContainer>
  );

  function formatElapsedTime(): string {
    const date = new Date(elapsedSeconds * 1000);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  function minimize() {
    Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Home));
  }

  function stop() {
    Redux.store.dispatch(taskInProgressActions.stop());
    Ui.showToast(t('taskInProgress.toast.stoppedWorking'));
  }

  function resume() {
    Redux.store.dispatch(taskInProgressActions.resume());
    Ui.showToast(t('taskInProgress.toast.resumedWorking'));
  }

  function finish() {
    const result = taskInProgress && targetTask ? {
      task: targetTask,
      startedAt: taskInProgress.startedAt,
      workingTime: Math.floor(elapsedSeconds / 60),
      // fix data
      recessTime: 0,
    } : null;

    setElapsedSeconds(0);
    Redux.store.dispatch(taskInProgressActions.finish());
    Redux.store.dispatch(result ? workingResultActions.set(result) : workingResultActions.unset());
    Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.TaskFinish));
    Ui.showToast(t('taskInProgress.toast.finishedWorking'));
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
  information: {
    marginBottom: Ui.dimension.margin * 2,
    marginHorizontal: Ui.dimension.margin,
    padding: Ui.dimension.margin * 2,
  },
  top: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: 8,
  },
  status: {
    fontSize: 18,
  },
  time: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  bottom: {
    display: 'flex',
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  descriptionLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
  },
  remainingTime: {
    alignSelf: 'flex-end',
    fontSize: 16,
  },
  progressBar: {
    borderColor: Ui.color.main,
    borderRadius: progressBarHeight / 2,
    borderWidth: Ui.dimension.border.width,
    display: 'flex',
    flexDirection: 'row',
    height: progressBarHeight,
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFillLeft: {
    backgroundColor: Ui.color.main,
    height: progressBarHeight - (Ui.dimension.border.width * 2),
  },
  progressBarFillRight: {
    backgroundColor: Ui.color.lightMain,
    height: progressBarHeight - (Ui.dimension.border.width * 2),
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Ui.dimension.margin,
  },
  controlItem: {
    alignItems: 'center',
    backgroundColor: Ui.color.white,
    display: 'flex',
    width: 100,
  },
  controlItemText: {
    marginTop: 3,
    fontSize: 16,
  },
});
