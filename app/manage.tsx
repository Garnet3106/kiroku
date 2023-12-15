import RouteContainer from '../src/components/RouteContainer';
import Dropdown from '../src/components/input/Dropdown';
import TaskItem from '../src/components/routes/Management/TaskItem';
import ContentSeparator from '../src/components/ContentSeparator';
import { TaskSortStyle } from '../src/task';
import { useState } from 'react';
import TaskRegistrationButton from '../src/components/TaskRegistrationButton';
import { t } from '../src/translations';
import { useSelector } from 'react-redux';
import Redux from '../src/redux/redux';

export default function () {
  const tasks = useSelector((state: Redux.RootState) => state.tasks);

  const taskItems = tasks.map((eachTask, index) => (
    <TaskItem
      task={eachTask}
      insertBottomMargin={index + 1 !== tasks.length}
      key={eachTask.id}
    />
  ));

  const [sortStyle, setSortStyle] = useState(TaskSortStyle.WorkingDay);

  const sortDropdownOptions = TaskSortStyle.enumerate().map((v) => ({
    uniqueId: v,
    text: t(`task.sortStyles.${v}`),
  }));

  return (
    <RouteContainer title={t('taskMgmt.taskMgmt')} containerChildren={<TaskRegistrationButton />}>
      <Dropdown
        options={sortDropdownOptions}
        selected={sortStyle}
        insertBottomMargin
        onChange={(id) => setSortStyle(id as number)}
      />
      <ContentSeparator insertBottomMargin />
      {taskItems}
    </RouteContainer>
  );
}
