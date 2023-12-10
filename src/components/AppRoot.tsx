import Initialization from './routes/Initialization/Initialization';
import MenuBar from './MenuBar/MenuBar';
import Home from './routes/Home/Home';
import Management from './routes/Management/Management';
import Performance from './routes/Performance';
import Settings from './routes/Settings';
import TaskEdit from './routes/TaskEdit';
import TaskInProgress from './routes/TaskInProgress';
import TaskFinish from './routes/TaskFinish';
import FirebaseDynamicLinks from '@react-native-firebase/dynamic-links';
import { useEffect, useState } from 'react';
import { Auth, User } from '../auth';
import Redux from '../redux/redux';
import { navigationActions } from '../redux/slices/navigation';
import { InitializationPageIndex, NavigationRoutePath } from '../navigation';
import Ui from '../ui';
import { Language, setLanguage, t } from '../translations';
import * as SplashScreen from 'expo-splash-screen';
import { Database } from '../database';
import { userActions } from '../redux/slices/user';
import { tasksActions } from '../redux/slices/tasks';
import { dailyWorkingStatsActions } from '../redux/slices/dailyWorkingStats';
import { DailyWorkingStats } from '../task';
import env from '../env';
import { useSelector } from 'react-redux';

SplashScreen.preventAutoHideAsync();

export default function AppRoot() {
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
          Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Home));
        } else {
          Ui.showToast('INTERNAL USER ERROR', {
            backgroundColor: Ui.color.red,
            showsLong: true,
            avoidMenuBar: false,
          });

          Redux.store.dispatch(navigationActions.jumpToInitialization(InitializationPageIndex.Top));
        }
      } else {
        Redux.store.dispatch(navigationActions.jumpToInitialization(InitializationPageIndex.Top));
      }

      SplashScreen.hideAsync();
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
    const dynamicLinks = FirebaseDynamicLinks();

    const tryToSignIn = (link: string) => {
      Auth.trySignInWithEmailLink(link)
        .then(() => {
          const user = User.create('User');

          Database.signIn(user)
            .then(() => {
              Ui.showToast(t('init.emailLogin.toast.loggedIn'));
              Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Home));
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

  return (
    <>
    <Initialization />
    <Home />
    <Performance />
    <Management />
    <Settings />
    <TaskEdit />
    <TaskInProgress />
    <TaskFinish />
    <MenuBar />
    </>
  );
}
