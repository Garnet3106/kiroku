import { StyleSheet, Text, View } from 'react-native';
import { NavigationRoutePath } from '../../navigation';
import ContentArea from '../ContentArea';
import RouteContainer from '../RouteContainer';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ui from '../../ui';
import Redux from '../../redux/redux';
import { navigationActions } from '../../redux/slices/navigation';
import { useState } from 'react';
import Dialog from 'react-native-dialog';
import { t } from '../../translations';

const progressBarHeight = 13;

export default function TaskInProgress() {
  const [stopDialogVisibility, setStopDialogVisibility] = useState(false);
  const [finishDialogVisibility, setFinishDialogVisibility] = useState(false);

  return (
    <RouteContainer path={NavigationRoutePath.TaskInProgress} title={t('taskInProgress.taskInProgress')}>
      <View style={styles.container}>
        <ContentArea style={styles.information}>
          <View style={styles.top}>
            <Text style={styles.status}>
              {t('taskInProgress.working')}
            </Text>
            <Text style={styles.time}>
              12:30
            </Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.description}>
              <View style={styles.descriptionLeft}>
                <Entypo name='book' color={Ui.color.black} size={20} top={3} style={{ marginRight: 3 }} />
                <Text style={styles.title}>
                  作業タイトル
                </Text>
              </View>
              <Text style={styles.remainingTime}>
                {t('taskInProgress.minutesLeft', { min: 30 })}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View style={styles.progressBarFillLeft} />
              <View style={styles.progressBarFillRight} />
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
          <ContentArea style={styles.controlItem} onPress={() => setStopDialogVisibility(true)}>
            <FontAwesome name='coffee' size={31} />
            <Text style={styles.controlItemText}>
              {t('taskInProgress.operation.stop')}
            </Text>
          </ContentArea>
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

  function minimize() {
    Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Home));
  }

  function stop() {
    Ui.showToast(t('taskInProgress.toast.stoppedWorking'));
  }

  function finish() {
    Ui.showToast(t('taskInProgress.toast.finishedWorking'));
    Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.TaskFinish));
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
    width: '50%',
  },
  progressBarFillRight: {
    backgroundColor: Ui.color.lightMain,
    height: progressBarHeight - (Ui.dimension.border.width * 2),
    width: '50%',
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
    fontSize: 16,
  },
});
