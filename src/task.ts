export type Minutes = number;

export namespace Minutes {
  export function now(): Seconds {
    return Math.floor(Date.now() / 1000 / 60);
  }
}

export type Seconds = number;

export namespace Seconds {
  export function now(): Seconds {
    return Math.floor(Date.now() / 1000);
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

export enum TaskIntervalType {
  Day,
  Week,
}

export type TaskInterval = {
  type: TaskIntervalType.Day,
  interval: number,
} | {
  type: TaskIntervalType.Week,
  interval: number,
  days: TaskIntervalDaysOfWeek,
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

export namespace DayOfWeek {
  export function enumerate(): DayOfWeek[] {
    return Object.values(DayOfWeek).filter((v) => typeof v === 'number').map((v) => Number(v));
  }
}

export type TaskIntervalDaysOfWeek = { [day in DayOfWeek]: boolean };

export namespace TaskIntervalDaysOfWeek {
  export function getInitial(): TaskIntervalDaysOfWeek {
    return {
      [DayOfWeek.Monday]: false,
      [DayOfWeek.Tuesday]: false,
      [DayOfWeek.Wednesday]: false,
      [DayOfWeek.Thursday]: false,
      [DayOfWeek.Friday]: false,
      [DayOfWeek.Saturday]: false,
      [DayOfWeek.Sunday]: false,
    };
  }
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

export type TaskWorkingResult = {
  task: Task,
  startedAt: Seconds,
  workingTime: Minutes,
  recessTime: Minutes,
};

export type TaskWorkingLog = {
  taskId: string,
  startedAt: Seconds,
  targetTime: Minutes,
  workingTime: Minutes,
  recessTime: Minutes,
  points: number,
  concentrationLevel?: number,
};
