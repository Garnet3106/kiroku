import { useEffect, useMemo, useState } from 'react';
import { NavigationRoutePath } from '../../navigation';
import RouteContainer from '../RouteContainer';
import Dropdown from '../input/Dropdown';
import Named from '../input/Named';
import { DayOfWeek, TaskCategory, TaskInterval, TaskIntervalDaysOfWeek, TaskIntervalType, TaskTargetTime } from '../../task';
import ContentArea from '../ContentArea';
import TextInput from '../input/TextInput';
import RectangleButton from '../input/RectangleButton';
import Ui from '../../ui';
import Dialog from 'react-native-dialog';
import Redux from '../../redux/redux';
import { navigationActions } from '../../redux/slices/navigation';
import ContentSeparator from '../ContentSeparator';
import { StyleSheet, Text, View } from 'react-native';
import { t } from '../../translations';
import { useSelector } from 'react-redux';
import { tasksActions } from '../../redux/slices/tasks';
import Uuid from 'react-native-uuid';
import ButtonRow from '../input/ButtonRow';

export default function TaskEdit() {
  const navigation = useSelector((state: Redux.RootState) => state.navigation);
  const displayed = navigation?.path === NavigationRoutePath.TaskEdit;
  const tasks = useSelector((state: Redux.RootState) => state.tasks);
  const targetTaskId = displayed ? (navigation.params.targetTaskId ?? null) : null;
  const targetTask = useMemo(() => targetTaskId ? tasks.find((v) => v.id === targetTaskId) : null, [tasks, targetTaskId]);
  const containerTitle = targetTaskId ? t('taskEdit.taskEdit') : t('taskEdit.taskReg');

  const categoryOptions = TaskCategory.enumerate().map((v) => ({
    uniqueId: v,
    text: t(`task.categories.${v}`),
  }));

  const targetTimeOptions = [
    { uniqueId: 30, text: '30min' },
    { uniqueId: 60, text: '1h' },
    { uniqueId: 120, text: '2h' },
    { uniqueId: 180, text: '3h' },
    { uniqueId: 'custom', text: t('taskEdit.custom') },
  ];

  const customTargetTimeOptions = [...Array(20)].map((_value, index) => {
    const minutes = (index + 1) * TaskTargetTime.minimumUnit;

    return {
      uniqueId: minutes,
      text: t('taskEdit.min', { min: minutes }),
    };
  });

  const intervalTypeOptions = [
    { uniqueId: TaskIntervalType.Day, text: t('taskEdit.day') },
    { uniqueId: TaskIntervalType.Week, text: t('taskEdit.week') },
  ];

  const intervalOptions = [...Array(5)].map((_value, index) => {
    const value = index + 1;

    return {
      uniqueId: value,
      text: t('taskEdit.every', { value }),
    };
  });

  const intervalDayOfWeekOptions = DayOfWeek.enumerate().map((_value, index) => ({
    uniqueId: index,
    text: t(`taskEdit.dayOfWeek.${index}`),
  }));

  const [category, setCategory] = useState(TaskCategory.Uncategorized);
  const [title, setTitle] = useState('');
  const [targetTime, setTargetTime] = useState<string | number>();
  const [customTargetTime, setCustomTargetTime] = useState<number>(TaskTargetTime.minimumUnit);
  const [intervalType, setIntervalType] = useState(TaskIntervalType.Day);
  const [interval, setInterval] = useState<number>(1);
  const [intervalDaysOfWeek, setIntervalDaysOfWeek] = useState<DayOfWeek[]>([]);

  useEffect(() => {
    setCategory(targetTask ? targetTask.category : TaskCategory.Uncategorized);
    setTitle(targetTask ? targetTask.title : '');
    setCustomTargetTime(TaskTargetTime.minimumUnit);

    if (targetTask) {
      const matchedTargetTime = targetTimeOptions.find((v) => v.uniqueId === targetTask.targetTime);

      if (matchedTargetTime) {
        setTargetTime(matchedTargetTime.uniqueId);
      } else {
        setTargetTime('custom');
        setCustomTargetTime(targetTask.targetTime);
      }
    }

    setIntervalType(targetTask ? targetTask.workingDate.interval.type : TaskIntervalType.Day);
    setInterval(targetTask ? targetTask.workingDate.interval.interval : 1);
    setIntervalDaysOfWeek(
      targetTask && targetTask.workingDate.interval.type === TaskIntervalType.Week ? convertDaysOfWeekToArray(targetTask.workingDate.interval.days) : [],
    );
  }, [displayed]);

  const [deleteDialogVisibility, setDeleteDialogVisibility] = useState(false);
  const [archiveDialogVisibility, setArchiveDialogVisibility] = useState(false);

  return (
    <RouteContainer path={NavigationRoutePath.TaskEdit} title={containerTitle}>
      <ContentArea>
        <Text style={styles.message}>
          {t('taskEdit.whatKindOfTask')}
        </Text>
        <Named title={t('taskEdit.category')} required insertBottomMargin>
          <Dropdown options={categoryOptions} selected={category} onChange={(v) => setCategory(v as number)} />
        </Named>
        <Named title={t('taskEdit.title')} required insertBottomMargin>
          <TextInput value={title} onChangeText={(v) => setTitle(v)} placeholder={t('taskEdit.titleExample')} />
        </Named>
        <Named title={t('taskEdit.targetTime')} required>
          <ButtonRow
            options={targetTimeOptions}
            selected={targetTime}
            onChange={(v) => setTargetTime(v as string | number)}
            insertBottomMargin
          />
          {
            targetTime === 'custom' && (
              <Dropdown
                options={customTargetTimeOptions}
                selected={customTargetTime}
                onChange={(v) => setCustomTargetTime(v as number)}
                insertBottomMargin
              />
            )
          }
        </Named>
        <Named title={t('taskEdit.intervalOfWorkingDate')} required>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            zIndex: 9000,
          }}>
            <Dropdown
              options={intervalOptions}
              selected={interval}
              style={{
                marginRight: Ui.dimension.margin,
                width: 130,
              }}
              onChange={(v) => setInterval(v as number)}
              insertBottomMargin
            />
            <Dropdown
              options={intervalTypeOptions}
              selected={intervalType}
              style={{ width: 130 }}
              onChange={(v) => setIntervalType(v as TaskIntervalType)}
              insertBottomMargin
            />
          </View>
          {
            intervalType === TaskIntervalType.Week && (
              <ButtonRow
                options={intervalDayOfWeekOptions}
                selected={intervalDaysOfWeek}
                onChange={(v) => setIntervalDaysOfWeek(v as DayOfWeek[])}
                insertBottomMargin
              />
            )
          }
        </Named>
        <ContentSeparator insertBottomMargin />
        {
          targetTask && (
            <RectangleButton
              text={t('taskEdit.delete')}
              color={Ui.color.red}
              pressedColor={Ui.color.pressed.redOnWhite}
              whiteBackground
              insertBottomMargin
              onPress={() => setDeleteDialogVisibility(true)}
            />
          )
        }
        <RectangleButton text={t('taskEdit.save')} onPress={onPressSaveButton} />
      </ContentArea>
      <Dialog.Container visible={deleteDialogVisibility}>
        <Dialog.Title>
          {t('taskEdit.dialog.taskMgmt')}
        </Dialog.Title>
        <Dialog.Description>
          {t('taskEdit.dialog.doYouReallyDeleteTask', { taskTitle: targetTask?.title ?? title })}
        </Dialog.Description>
        <Dialog.Button label={t('taskEdit.dialog.cancel')} onPress={() => setDeleteDialogVisibility(false)} />
        <Dialog.Button label={t('taskEdit.dialog.delete')} onPress={() => {
          setDeleteDialogVisibility(false);
          setArchiveDialogVisibility(true);
        }} />
      </Dialog.Container>
      <Dialog.Container visible={archiveDialogVisibility}>
        <Dialog.Title>
          {t('taskEdit.dialog.taskMgmt')}
        </Dialog.Title>
        <Dialog.Description>
          {t('taskEdit.dialog.doYouWantToArchive', { taskTitle: targetTask?.title ?? title })}
        </Dialog.Description>
        <Dialog.Button label={t('taskEdit.dialog.cancel')} onPress={() => setArchiveDialogVisibility(false)} />
        <Dialog.Button label={t('taskEdit.dialog.delete')} onPress={() => {
          setArchiveDialogVisibility(false);
          deleteTask();
        }} />
        <Dialog.Button label={t('taskEdit.dialog.archive')} onPress={() => {
          setArchiveDialogVisibility(false);
          // archiveTask();
        }} />
      </Dialog.Container>
    </RouteContainer>
  );

  // function getInitialStates() {}

  function convertDaysOfWeekToArray(days: TaskIntervalDaysOfWeek) {
    return DayOfWeek.enumerate().filter((v) => days[v]);
  }

  function convertDaysOfWeekToTypedMap(days: DayOfWeek[]): TaskIntervalDaysOfWeek {
    const typedMap = TaskIntervalDaysOfWeek.getInitial();
    days.forEach((v) => typedMap[v] = true);
    return typedMap;
  }

  function deleteTask() {
    Ui.showToast(t('taskEdit.toast.taskWasDeleted'));
    targetTaskId && Redux.store.dispatch(tasksActions.delete(targetTaskId));
    Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Management));
  }

  function onPressSaveButton() {
    const id = targetTaskId ? targetTaskId : Uuid.v4() as string;

    const targetTimeNumber = typeof targetTime === 'number' ? targetTime : customTargetTime;
    let taskIntervalObject: TaskInterval;

    switch (intervalType) {
      case TaskIntervalType.Day:
        taskIntervalObject = {
          type: TaskIntervalType.Day,
          interval: interval,
        };
        break;

      case TaskIntervalType.Week:
        taskIntervalObject = {
          type: TaskIntervalType.Week,
          interval: interval,
          days: convertDaysOfWeekToTypedMap(intervalDaysOfWeek),
        };
        break;
    }

    // add property specifications
    const task = {
      id,
      title,
      category,
      targetTime: targetTimeNumber,
      workingDate: {
        start: 0,
        interval: taskIntervalObject,
      },
      startTime: 0,
      recessInterval: 0,
    };

    const action = targetTaskId ? tasksActions.edit(task) : tasksActions.add(task);
    Redux.store.dispatch(action);
    Ui.showToast(t('taskEdit.toast.taskWasSaved'));
    Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Management));
  }
}

const styles = StyleSheet.create({
  message: {
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: Ui.dimension.margin,
  },
});
