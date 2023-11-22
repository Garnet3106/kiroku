import RouteContainer from '../../RouteContainer';
import { NavigationRoutePath } from '../../../navigation';
import Dropdown from '../../input/Dropdown';
import TaskItem from './TaskItem';
import ContentSeparator from '../../ContentSeparator';
import { TaskSortStyle } from '../../../task';
import { useState } from 'react';
import TaskRegistrationButton from '../../TaskRegistrationButton';
import { t } from '../../../translations';
import { useSelector } from 'react-redux';
import Redux from '../../../redux/redux';

export default function Management() {
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
    <RouteContainer
      path={NavigationRoutePath.Management}
      title={t('taskMgmt.taskMgmt')}
      containerChildren={<TaskRegistrationButton />}
    >
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
