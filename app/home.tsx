import RouteContainer from '../src/components/RouteContainer';
import { StyleSheet, Text, View } from 'react-native';
import ContentArea from '../src/components/ContentArea';
import Ui from '../src/ui';
import TaskItem from '../src/components/routes/Home/TaskItem';
import ContentTitle from '../src/components/ContentTitle';
import TaskRegistrationButton from '../src/components/TaskRegistrationButton';
import { t } from '../src/translations';
import { useSelector } from 'react-redux';
import Redux from '../src/redux/redux';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export default function () {
  const tasks = useSelector((state: Redux.RootState) => state.tasks);

  const taskItems = tasks.map((eachTask, index) => (
    <TaskItem
      task={eachTask}
      insertBottomMargin={index + 1 !== tasks.length}
      key={eachTask.id}
    />
  ));

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <RouteContainer title={t('home.home')} scrollable containerChildren={<TaskRegistrationButton />}>
      <ContentTitle text={t('home.todaysPerf')} insertBottomMargin />
      <ContentArea insertBottomMargin>
      </ContentArea>
      <View style={styles.titleRow}>
        <ContentTitle text={t('home.todaysTasks')} insertBottomMargin />
        <Text style={styles.numberOfTasks}>
          {t('home.done', { progress: '1/3' })}
        </Text>
      </View>
      {taskItems}
    </RouteContainer>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  numberOfTasks: {
    backgroundColor: Ui.color.gray,
    color: Ui.color.white,
    fontSize: 16,
    paddingBottom: 3,
    paddingHorizontal: 5,
    position: 'absolute',
    right: 0,
  },
});
