import FirebaseFirestore from '@react-native-firebase/firestore';
import { Auth, User } from './auth';
import env from './env';
import { DayOfWeek, Seconds, Task, TaskCategory, TaskIntervalType, UnidentifiedTask } from './task';
import uuid from 'react-native-uuid';

export namespace Database {
  const firestore = FirebaseFirestore();

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
}
