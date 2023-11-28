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
import { useEffect } from 'react';
import { Auth } from '../auth';
import Redux from '../redux/redux';
import { navigationActions } from '../redux/slices/navigation';
import { NavigationRoutePath } from '../navigation';
import Ui from '../ui';
import { t } from '../translations';

export default function AppRoot() {
  useEffect(() => {
    const dynamicLinks = FirebaseDynamicLinks();

    const tryToSignIn = (link: string) => {
      Auth.trySignInWithEmailLink(link)
        .then(() => {
          Ui.showToast(t('init.emailLogin.toast.loggedIn'));
          Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Home));
        })
        .catch((error) => {
          if (error.message.includes('[auth/invalid-action-code]')) {
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
    }

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
