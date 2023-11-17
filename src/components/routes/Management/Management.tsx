import RouteContainer from '../../RouteContainer';
import { NavigationRoutePath } from '../../../navigation';
import Dropdown from '../../input/Dropdown';
import TaskItem from './TaskItem';
import ContentSeparator from '../../ContentSeparator';
import { TaskSortStyle } from '../../../task';
import { useState } from 'react';

export default function Management() {
  const [sortStyle, setSortStyle] = useState(TaskSortStyle.WorkingDay);

  const sortDropdownItems = TaskSortStyle.enumerate().map((v) => ({
    uniqueId: v,
    text: TaskSortStyle.translate(v),
  }));

  const tasks = [undefined, undefined, undefined];

  const taskItems = tasks.map((_eachTask, index) => (
    <TaskItem
      insertBottomMargin={index + 1 !== tasks.length}
      key={Math.random()} /* task id */
    />
  ));

  return (
    <RouteContainer path={NavigationRoutePath.Management} title='作業管理'>
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
