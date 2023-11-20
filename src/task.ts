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

export enum TaskSortStyle {
  Name,
  WorkingDay,
}

export namespace TaskSortStyle {
  export function enumerate(): TaskSortStyle[] {
    return Object.values(TaskSortStyle).filter((v) => typeof v === 'number').map((v) => Number(v));
  }
}
