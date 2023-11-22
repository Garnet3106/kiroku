export type Minutes = number;

export type Seconds = number;

export namespace Seconds {
  export function now(): Seconds {
    return Date.now() / 1000;
  }
}

export type Task = {
  id: string,
  title: string,
  category: TaskCategory,
  targetTime: Minutes,
  workingDate: TaskWorkingDate,
  // Specify seconds between 0 and 86400.
  startTime?: Seconds,
  recessInterval?: Seconds,
};

export enum TaskCategory {
  Uncategorized,
  Reading,
  Study,
}

export namespace TaskCategory {
  export function enumerate(): TaskCategory[] {
    return Object.values(TaskCategory).filter((v) => typeof v === 'number').map((v) => Number(v));
  }
}

export namespace TaskTargetTime {
  export const minimumUnit = 10;
}

export type TaskWorkingDate = {
  start: number,
  interval: TaskInterval,
};

export type TaskInterval = {
  type: 'every',
  interval: number,
} | {
  type: 'weekly',
  days: { [day in DayOfWeek]: boolean }
};

export enum DayOfWeek {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

export enum TaskSortStyle {
  Name,
  WorkingDay,
}

export namespace TaskSortStyle {
  export function enumerate(): TaskSortStyle[] {
    return Object.values(TaskSortStyle).filter((v) => typeof v === 'number').map((v) => Number(v));
  }
}
