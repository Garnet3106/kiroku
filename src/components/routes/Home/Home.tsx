import RouteContainer from '../../RouteContainer';
import { NavigationRoutePath } from '../../../navigation';
import { StyleSheet, Text, View } from 'react-native';
import ContentArea from '../../ContentArea';
import Ui from '../../../ui';
import TaskItem from './TaskItem';
import ContentTitle from '../../ContentTitle';
import TaskRegistrationButton from '../../TaskRegistrationButton';
import { t } from '../../../translations';
import { useSelector } from 'react-redux';
import Redux from '../../../redux/redux';

export default function Home() {
  const tasks = useSelector((state: Redux.RootState) => state.tasks);

  const taskItems = tasks.map((eachTask, index) => (
    <TaskItem
      task={eachTask}
      insertBottomMargin={index + 1 !== tasks.length}
      key={eachTask.id}
    />
  ));

  return (
    <RouteContainer
      path={NavigationRoutePath.Home}
      title={t('home.home')}
      scrollable
      containerChildren={<TaskRegistrationButton />}
    >
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
