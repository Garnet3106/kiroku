import FirebaseFirestore from '@react-native-firebase/firestore';
import { Auth, User } from './auth';
import env from './env';

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
      const snapshot = await firestore.collection('users').doc(uid).get();
      return snapshot.data() as User ?? null;
    }
  }
}
