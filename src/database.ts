import FirebaseFirestore from '@react-native-firebase/firestore';
import { Auth, User } from './auth';
import env from './env';
import { DailyWorkingStats, DayOfWeek, Seconds, Task, TaskCategory, TaskIntervalType, TaskWorkLog, UnidentifiedTask } from './task';
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

  export function generateTaskId(): string {
    return firestore.collection('a').doc().id;
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

  export async function createTask(taskId: string, task: UnidentifiedTask, workingStats: DailyWorkingStats): Promise<void> {
    const uid = Auth.getUid();

    if (!uid) {
      throw 'auth/user-not-signed-in';
    }

    if (!env.preventDatabaseAccesses) {
      await firestore.collection('users').doc(uid).collection('tasks').doc(taskId).set({
        title: task.title,
        category: task.category,
        targetTime: task.targetTime,
        workingDateStart: task.workingDate.start,
        workingDateInterval: JSON.stringify(task.workingDate.interval),
        startTime: task.startTime,
        recessInterval: task.recessInterval,
      });
    }

    await setTodaysWorkingStats(workingStats);
  }

  export async function updateTask(task: Task, workingStats: DailyWorkingStats): Promise<void> {
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

    await setTodaysWorkingStats(workingStats);
  }

  export async function deleteTask(taskId: string, workingStats: DailyWorkingStats): Promise<void> {
    const uid = Auth.getUid();

    if (!uid) {
      throw 'auth/user-not-signed-in';
    }

    if (!env.preventDatabaseAccesses) {
      await firestore.collection('users').doc(uid).collection('tasks').doc(taskId).delete();
    }

    await setTodaysWorkingStats(workingStats);
  }

  export async function createWorkLog(workLog: TaskWorkLog, workingStats: DailyWorkingStats): Promise<void> {
    const uid = Auth.getUid();

    if (!uid) {
      throw 'auth/user-not-signed-in';
    }

    if (!env.preventDatabaseAccesses) {
      await firestore.collection('users').doc(uid).collection('tasks').doc(workLog.taskId).collection('workLogs').add({
        task: firestore.doc(`users/${uid}/tasks/${workLog.taskId}`),
        startedAt: workLog.startedAt,
        targetTime: workLog.targetTime,
        workingTime: workLog.workingTime,
        recessTime: workLog.recessTime,
        points: workLog.points,
        concentrationLevel: workLog.concentrationLevel,
      });
    }

    await setTodaysWorkingStats(workingStats);
  }

  async function setTodaysWorkingStats(workingStats: DailyWorkingStats): Promise<void> {
    const uid = Auth.getUid();

    if (!uid) {
      throw 'auth/user-not-signed-in';
    }

    if (!env.preventDatabaseAccesses) {
      // comonnize date
      const date = Math.floor(Date.now() / 1000 / 3600 / 24);
      await firestore.collection('users').doc(uid).collection('workingStats').doc(String(date)).set(workingStats);
    }
  }

  export async function getDailyWorkingStats(date: number): Promise<DailyWorkingStats | null> {
    const uid = Auth.getUid();

    if (!uid) {
      throw 'auth/user-not-signed-in';
    }

    if (!env.preventDatabaseAccesses) {
      const collection = firestore.collection('users').doc(uid).collection('workingStats');
      const workingStats = (await collection.doc(String(date)).get()).data();
      return workingStats as DailyWorkingStats ?? null;
    } else {
      return null;
    }
  }
}
