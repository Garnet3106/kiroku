import RouteContainer from '../src/components/RouteContainer';
import { Language, setLanguage, t } from '../src/translations';
import RectangleButtonList from '../src/components/input/RectangleButtonList';
import ContentTitle from '../src/components/ContentTitle';
import Ui from '../src/ui';
import { Auth } from '../src/auth';
import Redux from '../src/redux/redux';
import Dialog from 'react-native-dialog';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import ListBox from '../src/components/input/ListBox';
import { userActions } from '../src/redux/slices/user';
import { Database } from '../src/database';

export default function () {
  const router = useRouter();

  const [languageListBoxVisibility, setLanguageListBoxVisibility] = useState(false);

  const languageOptions = Language.enumerate().map((language) => ({
    uniqueId: language,
    text: t(`lang.${language}`),
  }));

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
          onPress: () => setLanguageListBoxVisibility(true),
        },
      ]} />
      <ListBox
        visible={languageListBoxVisibility}
        options={languageOptions}
        onPress={() => setLanguageListBoxVisibility(false)}
        onSelect={(option) => {
          changeLanguage(option.uniqueId as Language)
            .then(() => Ui.showToast("t('appSettings.toast.langWasChanged')"))
            .catch(() => Ui.showToast(t('appSettings.toast.failedToChangeLang'), Ui.getErrorToastOptions()));
        }}
      />
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

  async function changeLanguage(language: Language): Promise<void> {
    await Database.changeUserLanguage(language).catch((e: any) => { throw e });
    setLanguage(language);
    Redux.store.dispatch(userActions.setLanguage(language));
  }

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
        Ui.showToast(t('appSettings.toast.failedToLogout'), Ui.getErrorToastOptions());
      });
  }
}
