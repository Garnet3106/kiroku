import { GoogleSignin } from '@react-native-google-signin/google-signin';
import FirebaseAuth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Storage, StorageKey } from './storage';

GoogleSignin.configure({
  webClientId: '570741164338-qe9ite0h49ihaclb3neafml0ejpk0k2c.apps.googleusercontent.com',
});

export namespace Auth {
  const auth = FirebaseAuth();

  export function onAuthStateChanged(listener: FirebaseAuthTypes.AuthListenerCallback): () => void {
    return auth.onAuthStateChanged(listener);
  }

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

  export async function sendSignInLinkToEmail(email: string): Promise<void> {
    const actionCodeSettings = {
      url: 'https://kiroku.garnet.works/auth_failure',
      handleCodeInApp: true,
      iOS: {
        bundleId: 'works.garnet.kiroku',
      },
      android: {
        packageName: 'works.garnet.kiroku',
        installApp: true,
        minimumVersion: '1',
      },
      dynamicLinkDomain: 'kirokuapp.page.link',
    };

    await auth.sendSignInLinkToEmail(email, actionCodeSettings);
    await Storage.setItem(StorageKey.EmailForLinkAuth, email);
  }

  export async function trySignInWithEmailLink(link: string) {
    if (Auth.isSignInWithEmailLink(link)) {
      const email = await Storage.getItem(StorageKey.EmailForLinkAuth);

      if (email === null) {
        throw new Error('[auth/email-not-found]');
      }

      await Auth.signInWithEmailLink(email, link);
      await Storage.removeItem(StorageKey.EmailForLinkAuth);
    }
  }

  export function isSignInWithEmailLink(emailLink: string): boolean {
    return auth.isSignInWithEmailLink(emailLink);
  }

  export async function signInWithEmailLink(email: string, emailLink: string): Promise<FirebaseAuthTypes.UserCredential> {
    return await auth.signInWithEmailLink(email, emailLink);
  }

  export async function signOut(): Promise<void> {
    if (isSignedIn()) {
      await auth.signOut();
    }
  }
}
