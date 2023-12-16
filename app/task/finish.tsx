import { StyleSheet, Text, View } from 'react-native';
import ContentArea from '../../src/components/ContentArea';
import RouteContainer from '../../src/components/RouteContainer';
import Ui from '../../src/ui';
import ContentSeparator from '../../src/components/ContentSeparator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PressableOpacity from '../../src/components/pressable/PressableOpacity';
import { useState } from 'react';
import RectangleButton from '../../src/components/input/RectangleButton';
import Redux from '../../src/redux/redux';
import { t } from '../../src/translations';
import { useSelector } from 'react-redux';
import { workResultActions } from '../../src/redux/slices/workResult';
import { Database } from '../../src/database';
import { dailyWorkingStatsActions } from '../../src/redux/slices/dailyWorkingStats';
import { DailyWorkingStats } from '../../src/task';
import { useRouter } from 'expo-router';

export default function () {
  const router = useRouter();

  const workResult = useSelector((state: Redux.RootState) => state.workResult);
  const [concentrationLevel, setConcentrationLevel] = useState(0);

  if (!workResult) {
    return;
  }

  // fix data
  const points = 0;

  const concentrationLevels = [1, 2, 3, 4, 5].map((level) => (
    <PressableOpacity onPress={() => setConcentrationLevel(level)} key={level}>
      <MaterialCommunityIcons
        name='fire'
        color={Ui.color.white}
        size={33}
        style={[
          styles.concentrationLevelItem,
          { backgroundColor: level <= concentrationLevel ? Ui.color.orange : Ui.color.gray },
        ]}
      />
    </PressableOpacity>
  ));

  return (
    <RouteContainer title={t('taskFinish.taskFinish')}>
      <View style={styles.container}>
        <ContentArea style={styles.results}>
          <Text style={styles.message}>
            {t('taskFinish.wellDone')}
          </Text>
          <Text style={styles.status}>
            5回連続で取り組み中
          </Text>
          <ContentSeparator color={Ui.color.border.lightGray} style={{ marginBottom: Ui.dimension.margin / 2 }} />
          <View style={styles.property}>
            <Text style={{ fontSize: 16 }}>
              {t('taskFinish.properties.workingTime')}
            </Text>
            <Text style={styles.propertyData}>
              {t('taskFinish.properties.mins', { min: workResult.workingTime })}
            </Text>
          </View>
          <ContentSeparator color={Ui.color.border.lightGray} style={{ marginBottom: Ui.dimension.margin / 2 }} />
          <View style={styles.property}>
            <Text style={{ fontSize: 16 }}>
              {t('taskFinish.properties.recessTime')}
            </Text>
            <Text style={styles.propertyData}>
              {t('taskFinish.properties.mins', { min: workResult.recessTime })}
            </Text>
          </View>
          <ContentSeparator color={Ui.color.border.lightGray} style={{ marginBottom: Ui.dimension.margin / 2 }} />
          <View style={styles.property}>
            <Text style={{ fontSize: 16 }}>
              {t('taskFinish.properties.currentLevel')}
            </Text>
            <Text style={styles.propertyData}>
              {t('taskFinish.properties.plusPt', { pt: points })}
            </Text>
          </View>
          <ContentSeparator color={Ui.color.border.lightGray} style={{ marginBottom: Ui.dimension.margin * 2 }} />
          <Text style={{ fontSize: 16 }}>
            {t('taskFinish.letsRecordYourConcentrationLevel')}
          </Text>
          <View style={styles.concentrationLevel}>
            {concentrationLevels}
          </View>
          <RectangleButton text={t('taskFinish.save')} onPress={onPressCloseButton} />
        </ContentArea>
      </View>
    </RouteContainer>
  );

  async function onPressCloseButton() {
    if (!workResult) {
      Ui.showToast(t('taskFinish.toast.failedToSaveWorkLog'), Ui.getErrorToastOptions());
      return;
    }

    const workLog = {
      taskId: workResult.task.id,
      startedAt: workResult.startedAt,
      targetTime: workResult.task.targetTime,
      workingTime: workResult.workingTime,
      recessTime: workResult.recessTime,
      points,
      concentrationLevel: concentrationLevel === 0 ? undefined : concentrationLevel,
    };

    let succeeded = true;

    const tasks = Redux.store.getState().tasks;
    const workingStats = Redux.store.getState().dailyWorkingStats ?? DailyWorkingStats.getInitial(tasks);
    const newWorkingStats = DailyWorkingStats.addWorkLog(workingStats, workLog);
    await Database.createWorkLog(workLog, newWorkingStats).catch(() => succeeded = false);

    if (succeeded) {
      Ui.showToast(t('taskFinish.toast.workLogWasSaved'));
      Redux.store.dispatch(workResultActions.unset());
      Redux.store.dispatch(dailyWorkingStatsActions.set(newWorkingStats));
      router.replace('/home');
    } else {
      Ui.showToast(t('taskFinish.toast.failedToSaveWorkLog'), Ui.getErrorToastOptions());
    }
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
  results: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: Ui.dimension.margin * 4,
    marginHorizontal: Ui.dimension.margin,
    padding: Ui.dimension.margin * 2,
  },
  message: {
    fontSize: 20,
    marginBottom: 5,
  },
  status: {
    backgroundColor: Ui.color.main,
    color: Ui.color.white,
    paddingBottom: 4,
    paddingHorizontal: 5,
    paddingTop: 1,
    marginBottom: Ui.dimension.margin,
  },
  property: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Ui.dimension.margin / 2,
    width: '100%',
  },
  propertyData: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  concentrationLevel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Ui.dimension.margin * 2,
    marginTop: 8,
    width: '70%',
  },
  concentrationLevelItem: {
    backgroundColor: Ui.color.gray,
    borderRadius: 100,
    padding: 1,
  },
});
