import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Ui from '../../../ui';
import { Entypo } from '@expo/vector-icons';
import ContentArea from '../../ContentArea';
import Redux from '../../../redux/redux';
import { navigationActions } from '../../../redux/slices/navigation';
import { NavigationRoutePath } from '../../../navigation';
import { Task } from '../../../task';

export type TaskItemProps = Ui.LayoutProps & {
  task: Task,
  style?: StyleProp<ViewStyle>,
};

export default function TaskItem(props: TaskItemProps) {
  const descriptions = ['毎週火曜日', '120分', '休憩あり'];

  return (
    <ContentArea
      style={[
        styles.container,
        { marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined },
        props.style,
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Entypo name='book' color={Ui.color.black} size={20} top={3} style={{ marginRight: 2 }} />
        <View>
          <Text style={styles.title}>
            {props.task.title}
          </Text>
          <Text style={styles.description}>
            {descriptions.join(' ･ ')}
          </Text>
        </View>
      </View>
      <Entypo name='chevron-right' color={Ui.color.gray} size={30} />
    </ContentArea>
  );

  function onPress() {
    Redux.store.dispatch(navigationActions.jumpToWithParams({
      path: NavigationRoutePath.TaskEdit,
      params: {
        targetTaskId: props.task.id,
      },
    }));
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: Ui.dimension.border.radius,
    backgroundColor: Ui.color.background,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    padding: Ui.dimension.margin,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    marginBottom: 2,
  },
  description: {
    color: Ui.color.gray,
  },
});
