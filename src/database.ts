import FirebaseFirestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Auth, User } from './auth';
import env from './env';
import { DayOfWeek, Seconds, Task, TaskCategory, TaskIntervalType, TaskWorkLog, UnidentifiedTask } from './task';
import uuid from 'react-native-uuid';

export namespace Database {
  const firestore = FirebaseFirestore();

  firestore.settings({
    ignoreUndefinedProperties: true,
  });

  export async function getUser(): Promise<User | null> {
    const uid = Auth.getUid();

    if (!uid) {
      return null;
    }

    if (env.preventDatabaseAccesses) {
      return { nickname: 'John' };
    } else {
      const data = (await firestore.collection('users').doc(uid).get()).data();
      return data === undefined ? null : { nickname: data.nickname };
    }
  }

  export async function getTasks(): Promise<Task[] | null> {
    const uid = Auth.getUid();

    if (!uid) {
      return null;
    }

    if (env.preventDatabaseAccesses) {
      return [
        {
          id: uuid.v4() as string,
          title: 'FE勉強',
          category: TaskCategory.Study,
          targetTime: 60,
          workingDate: {
            start: Seconds.now() / 1000,
            interval: {
              type: TaskIntervalType.Day,
              interval: 1,
            },
          },
        },
        {
          id: uuid.v4() as string,
          title: '受験勉強',
          category: TaskCategory.Study,
          targetTime: 100,
          workingDate: {
            start: Seconds.now() / 1000,
            interval: {
              type: TaskIntervalType.Week,
              interval: 2,
              days: {
                [DayOfWeek.Monday]: false,
                [DayOfWeek.Tuesday]: false,
                [DayOfWeek.Wednesday]: false,
                [DayOfWeek.Thursday]: false,
                [DayOfWeek.Friday]: false,
                [DayOfWeek.Saturday]: false,
                [DayOfWeek.Sunday]: false,
              },
            },
          },
        },
      ];
    } else {
      const snapshot = await firestore.collection('users').doc(uid).collection('tasks').get();

      return snapshot.docs.map((eachSnapshot) => {
        const data = eachSnapshot.data();

        return {
          id: eachSnapshot.id,
          title: data.title,
          category: data.category,
          targetTime: data.targetTime,
          workingDate: {
            start: data.workingDateStart,
            interval: JSON.parse(data.workingDateInterval),
          },
          startTime: data.startTime,
          recessInterval: data.recessInterval,
        };
      });
    }
  }

  export async function createTask(task: UnidentifiedTask): Promise<void> {
    const uid = Auth.getUid();

    if (!uid) {
      throw 'auth/user-not-signed-in';
    }

    if (!env.preventDatabaseAccesses) {
      await firestore.collection('users').doc(uid).collection('tasks').add({
        title: task.title,
        category: task.category,
        targetTime: task.targetTime,
        workingDateStart: task.workingDate.start,
        workingDateInterval: JSON.stringify(task.workingDate.interval),
        startTime: task.startTime,
        recessInterval: task.recessInterval,
      });
    }
  }

  export async function updateTask(task: Task): Promise<void> {
    const uid = Auth.getUid();

    if (!uid) {
      throw 'auth/user-not-signed-in';
    }

    if (!env.preventDatabaseAccesses) {
      await firestore.collection('users').doc(uid).collection('tasks').doc(task.id).update({
        title: task.title,
        category: task.category,
        targetTime: task.targetTime,
        workingDateStart: task.workingDate.start,
        workingDateInterval: JSON.stringify(task.workingDate.interval),
        startTime: task.startTime,
        recessInterval: task.recessInterval,
      });
    }
  }

  export async function deleteTask(taskId: string): Promise<void> {
    const uid = Auth.getUid();

    if (!uid) {
      throw 'auth/user-not-signed-in';
    }

    if (!env.preventDatabaseAccesses) {
      await firestore.collection('users').doc(uid).collection('tasks').doc(taskId).delete();
    }
  }

  export async function createWorkLog(workLog: TaskWorkLog): Promise<void> {
    const uid = Auth.getUid();

    if (!uid) {
      throw 'auth/user-not-signed-in';
    }

    if (!env.preventDatabaseAccesses) {
      const taskDate = workLog.startedAt === 0 ? 0 : Math.floor(workLog.startedAt / 3600 / 24);

      await firestore.collection('users').doc(uid).collection('tasks').doc(workLog.taskId).collection('workLogs').add({
        task: firestore.doc(`users/${uid}/tasks/${workLog.taskId}`),
        startedAt: workLog.startedAt,
        targetTime: workLog.targetTime,
        workingTime: workLog.workingTime,
        recessTime: workLog.recessTime,
        points: workLog.points,
        concentrationLevel: workLog.concentrationLevel,
      });

      const workingStatsDoc = firestore.collection('users').doc(uid).collection('workingStats').doc(String(taskDate));
      const workingStats = (await workingStatsDoc.get()).data();
      await workingStatsDoc.set(getWorkingStats(workLog, workingStats));
    }
  }

  // add concentration level avarage
  function getWorkingStats(workLog: TaskWorkLog, workingStats: FirebaseFirestoreTypes.DocumentData | undefined): object {
    if (!workingStats) {
      return {
        tasks: {
          [workLog.taskId]: {
            targetTime: workLog.targetTime,
            totalWorkingTime: workLog.workingTime,
            totalRecessTime: workLog.recessTime,
          },
        },
        totalTargetTime: workLog.targetTime,
        totalWorkingTime: workLog.workingTime,
        totalRecessTime: workLog.recessTime,
      };
    }

    const tasks = workingStats.tasks;
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
