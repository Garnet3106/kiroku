import RouteContainer from '../../RouteContainer';
import { NavigationRoutePath } from '../../../navigation';
import Dropdown from '../../input/Dropdown';
import TaskItem from './TaskItem';
import ContentSeparator from '../../ContentSeparator';
import { TaskSortStyle } from '../../../task';
import { useState } from 'react';
import TaskRegistrationButton from '../../TaskRegistrationButton';
import { t } from '../../../translations';

export default function Management() {
  const [sortStyle, setSortStyle] = useState(TaskSortStyle.WorkingDay);

  const sortDropdownItems = TaskSortStyle.enumerate().map((v) => ({
    uniqueId: v,
    text: t(`task.sortStyles.${v}`),
  }));

  const tasks = [undefined, undefined, undefined];

  const taskItems = tasks.map((_eachTask, index) => (
    <TaskItem
      insertBottomMargin={index + 1 !== tasks.length}
      key={Math.random()} /* task id */
    />
  ));

  return (
    <RouteContainer
      path={NavigationRoutePath.Management}
      title={t('taskMgmt.taskMgmt')}
      containerChildren={<TaskRegistrationButton />}
    >
      <Dropdown
        options={sortDropdownItems}
        selected={sortStyle}
        insertBottomMargin
        onChange={(id) => setSortStyle(id as number)}
      />
      <ContentSeparator insertBottomMargin />
      {taskItems}
    </RouteContainer>
  );
}
