import RouteContainer from '../src/components/RouteContainer';
import { t } from '../src/translations';
import RectangleButtonList from '../src/components/input/RectangleButtonList';
import ContentTitle from '../src/components/ContentTitle';
import Ui from '../src/ui';
import { Auth } from '../src/auth';
import Redux from '../src/redux/redux';
import Dialog from 'react-native-dialog';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';

export default function () {
  const router = useRouter();

  const user = useSelector((state: Redux.RootState) => state.user);
  const [logoutDialogVisibility, setLogoutDialogVisibility] = useState(false);

  return (
    <RouteContainer title={t('appSettings.appSettings')} scrollable>
      <ContentTitle text={t('appSettings.yourProfile')} insertBottomMargin />
      <RectangleButtonList
        buttons={[
          {
            text: t('appSettings.nickname'),
            caption: user?.nickname ?? 'N/A',
            onPress: () => {},
          },
          {
            text: t('appSettings.logout'),
            textStyle: { color: Ui.color.red },
            onPress: () => setLogoutDialogVisibility(true),
          },
        ]}
        insertBottomMargin
      />
      <ContentTitle text={t('appSettings.display')} insertBottomMargin />
      <RectangleButtonList buttons={[
        {
          text: t('appSettings.lang'),
          caption: user ? t(`lang.${user.language}`) : 'N/A',
          onPress: () => {},
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

        router.replace('/init');
      })
      .catch(() => {
        Ui.showToast(t('appSettings.toast.failedToLogout'), {
          backgroundColor: Ui.color.red,
          showsLong: true,
        });
      });
  }
}
