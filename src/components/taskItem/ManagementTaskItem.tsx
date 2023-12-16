import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Ui from '../../ui';
import { Entypo } from '@expo/vector-icons';
import ContentArea from '../ContentArea';
import { DayOfWeek, Task, TaskIntervalType } from '../../task';
import { t } from '../../translations';
import { useRouter } from 'expo-router';

export type ManagementTaskItemProps = Ui.LayoutProps & {
  task: Task,
  style?: StyleProp<ViewStyle>,
};

export default function ManagementTaskItem(props: ManagementTaskItemProps) {
  const router = useRouter();
  const descriptions = getDescription();

  return (
    <ContentArea
      style={[
        styles.container,
        { marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined },
        props.style,
      ]}
      onPress={() => router.replace(`/task/${props.task.id}/edit`)}
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

  function getDescription(): string[] {
    const descriptions = [];
    descriptions.push(t('taskMgmt.taskItem.mins', { min: props.task.targetTime }));

    const interval = props.task.workingDate.interval.interval;

    switch (props.task.workingDate.interval.type) {
      case TaskIntervalType.Day:
        descriptions.push(interval === 1 ? t('taskMgmt.taskItem.daily') : t('taskMgmt.taskItem.everyDays', { interval }));
        break;

      case TaskIntervalType.Week: {
        const daysOfWeek = props.task.workingDate.interval.days;
        const translatedDaysOfWeek = DayOfWeek.enumerate().filter((v) => daysOfWeek[v]).map((v) => t(`task.dayOfWeek.${v}`)).join('');

        if (interval === 1) {
          descriptions.push(translatedDaysOfWeek);
        } else {
          descriptions.push(t('taskMgmt.taskItem.everyWeeksOn', { interval, daysOfWeek: translatedDaysOfWeek }));
        }
      } break;
    }

    props.task.recessInterval !== undefined && descriptions.push(t('taskMgmt.taskItem.remindRecess'));
    return descriptions;
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
