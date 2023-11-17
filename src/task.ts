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

export namespace TaskSortStyle {
  export function enumerate(): TaskSortStyle[] {
    return Object.values(TaskSortStyle).filter((v) => typeof v === 'number').map((v) => Number(v));
  }

  export function translate(sortStyle: TaskSortStyle): string {
    switch (sortStyle) {
      case TaskSortStyle.Name:
        return '名前順';

      case TaskSortStyle.WorkingDay:
        return '作業日が近い順';
    }
  }
}
