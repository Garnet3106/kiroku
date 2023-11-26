import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import FirebaseAuth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '570741164338-qe9ite0h49ihaclb3neafml0ejpk0k2c.apps.googleusercontent.com',
});

export namespace Auth {
  const auth = FirebaseAuth();

  export async function signInWithGoogle(): Promise<User> {
    return await GoogleSignin.signIn();
  }
}
