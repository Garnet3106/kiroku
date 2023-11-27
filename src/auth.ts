import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import FirebaseAuth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '570741164338-qe9ite0h49ihaclb3neafml0ejpk0k2c.apps.googleusercontent.com',
});

export namespace Auth {
  const auth = FirebaseAuth();

  export function isSignedIn(): boolean {
    return auth.currentUser !== null;
  }

  export async function signInWithGoogle(): Promise<void> {
    const user = await GoogleSignin.signIn();
    const idToken = user.idToken;

    if (idToken === null) {
      throw 'ID_TOKEN_IS_NULL';
    }

    const credential = FirebaseAuth.GoogleAuthProvider.credential(idToken);
    await auth.signInWithCredential(credential);
  }

  export async function signOut(): Promise<void> {
    if (isSignedIn()) {
      await auth.signOut();
    }
  }
}
