import FirebaseDynamicLinks from '@react-native-firebase/dynamic-links';
import { useEffect, useState } from 'react';
import { Auth, User } from '../src/auth';
import Redux from '../src/redux/redux';
import Ui from '../src/ui';
import { Language, setLanguage, t } from '../src/translations';
import * as SplashScreen from 'expo-splash-screen';
import { Database } from '../src/database';
import { userActions } from '../src/redux/slices/user';
import { tasksActions } from '../src/redux/slices/tasks';
import { dailyWorkingStatsActions } from '../src/redux/slices/dailyWorkingStats';
import { DailyWorkingStats } from '../src/task';
import env from '../src/env';
import { useSelector } from 'react-redux';
import { Storage, StorageKey } from '../src/storage';
import { taskInProgressActions } from '../src/redux/slices/taskInProgress';
import { useRouter } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function () {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged(async () => {
      const user = await Database.getUser();

      if (Auth.isSignedIn()) {
        if (user) {
          Redux.store.dispatch(userActions.set(user));

          const tasks = await Database.getTasks();

          if (tasks) {
            Redux.store.dispatch(tasksActions.set(tasks));
          }

          const date = Math.floor(Date.now() / 1000 / 3600 / 24);
          const dailyWorkingStats = await Database.getDailyWorkingStats(date) ?? DailyWorkingStats.getInitial(tasks ?? []);
          Redux.store.dispatch(dailyWorkingStatsActions.set(dailyWorkingStats));
          router.replace('/home');
        } else {
          Ui.showToast('INTERNAL USER ERROR', {
            backgroundColor: Ui.color.red,
            showsLong: true,
            avoidMenuBar: false,
          });

          router.replace('/init');
        }
      } else {
        router.replace('/init');
      }
    });

    return () => unsubscribe();
  }, []);

  const language = useSelector((state: Redux.RootState) => state.user?.language);
  const [_languageForRerendering, setLanguageForRerendering] = useState<Language>();

  useEffect(() => {
    const newLanguage = (env.languageCode ?? language ?? Language.getInitial()) as Language;
    setLanguage(newLanguage);
    setLanguageForRerendering(newLanguage);
  }, [language]);

  useEffect(() => {
    Storage.getItem(StorageKey.TaskInProgress).then((taskInProgress) => {
      if (taskInProgress) {
        Redux.store.dispatch(taskInProgressActions.set(JSON.parse(taskInProgress)));
      }
    });
  }, []);

  useEffect(() => {
    const dynamicLinks = FirebaseDynamicLinks();

    const tryToSignIn = (link: string) => {
      Auth.trySignInWithEmailLink(link)
        .then(() => {
          const user = User.create('User');

          Database.signIn(user)
            .then(() => {
              Ui.showToast(t('init.emailLogin.toast.loggedIn'));
              router.replace('/home');
            })
            .catch(() => {
              Ui.showToast(t('init.emailLogin.toast.loggedIn'), {
                backgroundColor: Ui.color.red,
                showsLong: true,
                avoidMenuBar: false,
              });
            });
        })
        .catch((error) => {
          if (typeof error?.message === 'string' && error.message.includes('[auth/invalid-action-code]')) {
            Ui.showToast(t('init.emailLogin.toast.invalidAuthLink'), {
              backgroundColor: Ui.color.red,
              avoidMenuBar: false,
              showsLong: true,
            });

            return;
          }

          Ui.showToast(t('init.emailLogin.toast.failedToAuthWithEmail'), {
            backgroundColor: Ui.color.red,
            avoidMenuBar: false,
            showsLong: true,
          });
        });
    };

    dynamicLinks.getInitialLink().then((link) => {
      if (link) {
        tryToSignIn(link.url);
      }
    });

    const unsubscribe = dynamicLinks.onLink((link) => tryToSignIn(link.url));
    return () => unsubscribe();
  }, []);
}
