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

export type UnidentifiedTask = {
  title: string,
  category: TaskCategory,
  targetTime: Minutes,
  workingDate: TaskWorkingDate,
  // Specify seconds between 0 and 86400.
  startTime?: Seconds,
  recessInterval?: Seconds,
};

export type Task = UnidentifiedTask & {
  id: string,
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

export type TaskWorkResult = {
  task: Task,
  startedAt: Seconds,
  workingTime: Minutes,
  recessTime: Minutes,
};

export type TaskWorkLog = {
  taskId: string,
  startedAt: Seconds,
  targetTime: Minutes,
  workingTime: Minutes,
  recessTime: Minutes,
  points: number,
  concentrationLevel?: number,
};

// add concentration level avarage
export type DailyWorkingStats = {
  tasks: DailyWorkingStatTasks,
  totalTargetTime: number,
  totalWorkingTime: number,
  totalRecessTime: number,
};

export namespace DailyWorkingStats {
  export function getInitial(tasks: Task[]): DailyWorkingStats {
    const workingStatsOfTasks: DailyWorkingStatTasks = {};

    tasks.forEach((eachTask) => {
      workingStatsOfTasks[eachTask.id] = {
        targetTime: eachTask.targetTime,
        totalWorkingTime: 0,
        totalRecessTime: 0,
      };
    });

    return calculate(workingStatsOfTasks);
  }

  export function addOrUpdateTask(workingStats: DailyWorkingStats, task: Task): DailyWorkingStats {
    const tasks = {...workingStats.tasks};
    const targetTask = tasks[task.id];

    tasks[task.id] = targetTask ? {
      targetTime: task.targetTime,
      totalWorkingTime: targetTask.totalWorkingTime,
      totalRecessTime: targetTask.totalRecessTime,
    } : {
      targetTime: task.targetTime,
      totalWorkingTime: 0,
      totalRecessTime: 0,
    };

    return calculate(tasks);
  }

  export function removeTask(workingStats: DailyWorkingStats, taskId: string): DailyWorkingStats {
    const tasks = {...workingStats.tasks};
    delete tasks[taskId];
    return calculate(tasks);
  }

  export function addWorkLog(workingStats: DailyWorkingStats, workLog: TaskWorkLog): DailyWorkingStats {
    const tasks = {...workingStats.tasks};
    const targetTask = tasks[workLog.taskId];

    tasks[workLog.taskId] = targetTask ? {
      targetTime: workLog.targetTime,
      totalWorkingTime: targetTask.totalWorkingTime + workLog.workingTime,
      totalRecessTime: targetTask.totalRecessTime + workLog.recessTime,
    } : {
      targetTime: workLog.targetTime,
      totalWorkingTime: workLog.workingTime,
      totalRecessTime: workLog.recessTime,
    };

    return calculate(tasks);
  }

  export function calculate(tasks: DailyWorkingStatTasks): DailyWorkingStats {
    let totalTargetTime = 0;
    let totalWorkingTime = 0;
    let totalRecessTime = 0;

    Object.values(tasks).forEach((eachTask: any) => {
      totalTargetTime += eachTask.targetTime;
      totalWorkingTime += eachTask.totalWorkingTime;
      totalRecessTime += eachTask.totalRecessTime;
    });

    return {
      tasks,
      totalTargetTime,
      totalWorkingTime,
      totalRecessTime,
    };
  }
}

export type DailyWorkingStatTasks = {
  [key: string]: {
    targetTime: number,
    totalWorkingTime: number,
    totalRecessTime: number,
  },
};
