export enum TaskCategory {
  Uncategorized,
  Reading,
  Study,
}

export namespace TaskCategory {
  export function enumerate(): TaskCategory[] {
    return Object.values(TaskCategory).filter((v) => typeof v === 'number').map((v) => Number(v));
  }

  export function translate(category: TaskCategory): string {
    switch (category) {
      case TaskCategory.Uncategorized:
      return '未分類';

      case TaskCategory.Reading:
      return '読書';

      case TaskCategory.Study:
      return '勉強';
    }
  }
}

export enum TaskSortStyle {
  Name,
  WorkingDay,
}
