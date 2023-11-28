import RouteContainer from '../RouteContainer';
import { InitializationPageIndex, NavigationRoutePath } from '../../navigation';
import { t } from '../../translations';
import RectangleButtonList from '../input/RectangleButtonList';
import ContentTitle from '../ContentTitle';
import Ui from '../../ui';
import { Auth } from '../../auth';
import Redux from '../../redux/redux';
import { navigationActions } from '../../redux/slices/navigation';
import Dialog from 'react-native-dialog';
import { useState } from 'react';

export default function Settings() {
  const [logoutDialogVisibility, setLogoutDialogVisibility] = useState(false);

  return (
    <RouteContainer
      path={NavigationRoutePath.Settings}
      title={t('appSettings.appSettings')}
      scrollable
    >
      <ContentTitle text={t('settings.account')} insertBottomMargin />
      <RectangleButtonList buttons={[
        {
          text: t('appSettings.nickname'),
          onPress: () => {},
        },
        {
          text: t('appSettings.logout'),
          textStyle: { color: Ui.color.red },
          onPress: () => setLogoutDialogVisibility(true),
        },
      ]} />
      <Dialog.Container visible={logoutDialogVisibility}>
        <Dialog.Title>
          {t('appSettings.appSettings')}
        </Dialog.Title>
        <Dialog.Description>
          {t('appSettings.dialog.doYouReallyLogout')}
        </Dialog.Description>
        <Dialog.Button label={t('appSettings.dialog.cancel')} onPress={() => setLogoutDialogVisibility(false)} />
        <Dialog.Button label={t('appSettings.dialog.logout')} onPress={() => {
          setLogoutDialogVisibility(false);
          signOut();
        }} />
      </Dialog.Container>
    </RouteContainer>
  );

  function signOut() {
    // add sync process

    Auth.signOut()
      .then(() => {
        Ui.showToast(t('appSettings.toast.loggedOut'), {
          avoidMenuBar: false,
        });

        Redux.store.dispatch(navigationActions.jumpToInitialization(InitializationPageIndex.Top));
      })
      .catch(() => {
        Ui.showToast(t('appSettings.toast.failedToLogout'), {
          backgroundColor: Ui.color.red,
          showsLong: true,
        });
      });
  }
}
