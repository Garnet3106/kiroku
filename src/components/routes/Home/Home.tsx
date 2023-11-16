import RouteContainer from '../../RouteContainer';
import { NavigationRoutePath } from '../../../navigation';
import { StyleSheet, Text, View } from 'react-native';
import ContentArea from '../../ContentArea';
import Ui from '../../../ui';
import TaskItem from './TaskItem';
import ContentTitle from '../../ContentTitle';

export default function Home() {
  const tasks = [undefined, undefined, undefined];

  const taskItems = tasks.map((_eachTask, index) => (
    <TaskItem
      style={{ marginBottom: index + 1 === tasks.length ? 0 : Ui.dimension.margin }}
      key={Math.random()} /* task id */
    />
  ));

  return (
    <RouteContainer path={NavigationRoutePath.Home} title='ホーム' scrollable>
      <ContentTitle text='今日の実績' insertBottomMargin />
      <ContentArea insertBottomMargin>
      </ContentArea>
      <View style={styles.titleRow}>
        <ContentTitle text='今日の作業' insertBottomMargin />
        <Text style={styles.numberOfTasks}>
          1/3 完了
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
    paddingHorizontal: 3,
    position: 'absolute',
    right: 0,
  },
});
