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
import { workResultActions } from '../../redux/slices/workResult';

const progressBarHeight = 13;

export default function TaskInProgress() {
  const tasks = useSelector((state: Redux.RootState) => state.tasks);
  const taskInProgress = useSelector((state: Redux.RootState) => state.taskInProgress);
  const targetTask = useMemo(() => tasks.find((v) => v.id === taskInProgress?.id) ?? null, [tasks, taskInProgress?.id]);

  const [stopDialogVisibility, setStopDialogVisibility] = useState(false);
  const [resumeDialogVisibility, setResumeDialogVisibility] = useState(false);
  const [finishDialogVisibility, setFinishDialogVisibility] = useState(false);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timestampLogs, setTimestampLogs] = useState<Seconds[]>([]);

  useEffect(() => {
    if (taskInProgress) {
      const interval = setInterval(() => setElapsedSeconds(Seconds.now() - taskInProgress.startedAt), 1000);
      return () => clearInterval(interval);
    }
  }, [taskInProgress]);

  if (!taskInProgress || !targetTask) {
    return;
  }

  // add past working time
  const workingSeconds = calculateWorkingSeconds();
  const latestRecessSeconds = calculateLatestRecessSeconds();
  const remainingMinutes = Math.floor(targetTask.targetTime - (workingSeconds / 60) + 1);
  const remainingTimeRatio = Math.floor(((workingSeconds / 60) / targetTask.targetTime) * 100);

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
            <Text style={[
              styles.status,
              { color: taskInProgress.stopped ? Ui.color.orange : Ui.color.main },
            ]}>
              {taskInProgress.stopped ? t('taskInProgress.onBreak') : t('taskInProgress.working')}
            </Text>
            <Text style={styles.time}>
              {taskInProgress.stopped ? formatSeconds(latestRecessSeconds) : formatSeconds(workingSeconds)}
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

  function calculateWorkingSeconds(): Seconds {
    if (!taskInProgress) {
      return 0;
    }

    const timestamps = [taskInProgress.startedAt, ...timestampLogs, Seconds.now()];
    let total = 0;
    let start = 0;

    for (let i = 0; i < timestamps.length; i += 2) {
      start = timestamps[i];

      if (i + 1 < timestamps.length) {
        total += timestamps[i + 1] - start;
      }
    }

    return total;
  }

  function calculateLatestRecessSeconds(): Seconds {
    if (!taskInProgress || !taskInProgress.stopped || timestampLogs.length === 0) {
      return 0;
    } else {
      return Seconds.now() - timestampLogs[timestampLogs.length - 1];
    }
  }

  function formatSeconds(value: Seconds): string {
    const date = new Date(value * 1000);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  function minimize() {
    Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Home));
  }

  function stop() {
    setTimestampLogs((state) => [...state, Seconds.now()]);
    Redux.store.dispatch(taskInProgressActions.stop());
    Ui.showToast(t('taskInProgress.toast.stoppedWorking'));
  }

  function resume() {
    setTimestampLogs((state) => [...state, Seconds.now()]);
    Redux.store.dispatch(taskInProgressActions.resume());
    Ui.showToast(t('taskInProgress.toast.resumedWorking'));
  }

  function finish() {
    const result = taskInProgress && targetTask ? {
      task: targetTask,
      startedAt: taskInProgress.startedAt,
      workingTime: Math.floor(workingSeconds / 60),
      recessTime: Math.floor((elapsedSeconds - workingSeconds) / 60),
    } : null;

    setElapsedSeconds(0);
    setTimestampLogs([]);
    Redux.store.dispatch(taskInProgressActions.finish());
    Redux.store.dispatch(result ? workResultActions.set(result) : workResultActions.unset());
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
