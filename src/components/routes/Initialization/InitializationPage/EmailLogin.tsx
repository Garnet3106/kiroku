import { useState } from 'react';
import { Auth } from '../../../../auth';
import { InitializationPageIndex } from '../../../../navigation';
import { t } from '../../../../translations';
import Ui from '../../../../ui';
import TextInput from '../../../input/TextInput';
import InitializationPage from './InitializationPage';
import Named from '../../../input/Named';
import RectangleButton from '../../../input/RectangleButton';
import Dialog from 'react-native-dialog';

export default function EmailLogin() {
  const [email, setEmail] = useState('');
  const [authMailSent, setAuthMailSent] = useState(false);
  const [emailConfirmationVisibility, setEmailConfirmationVisibility] = useState(false);
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);

  return (
    <InitializationPage
      pageIndex={InitializationPageIndex.EmailLogin}
      previous={InitializationPageIndex.Login}
    >
      <Named title={t('init.emailLogin.emailAddress')} required insertBottomMargin>
        <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder={t('init.emailLogin.emailAddressExample')} />
      </Named>
      <RectangleButton
        color={authMailSent ? Ui.color.black : Ui.color.main}
        pressedColor={authMailSent ? Ui.color.pressed.black : Ui.color.pressed.main}
        text={authMailSent ? t('init.emailLogin.resendLoginLink') : t('init.emailLogin.sendLoginLink')}
        disabled={sendButtonDisabled}
        onPress={confirmEmail}
      />
      <Dialog.Container visible={emailConfirmationVisibility}>
        <Dialog.Title>
          {t('init.emailLogin.dialog.confirmEmail')}
        </Dialog.Title>
        <Dialog.Description>
          {t('init.emailLogin.dialog.areYouSureToSendAuthLink', { email })}
        </Dialog.Description>
        <Dialog.Button label={t('init.emailLogin.dialog.cancel')} onPress={() => setEmailConfirmationVisibility(false)} />
        <Dialog.Button label={t('init.emailLogin.dialog.send')} onPress={() => {
          setEmailConfirmationVisibility(false);
          sendSignInLinkToEmail();
        }} />
      </Dialog.Container>
    </InitializationPage>
  );

  function confirmEmail() {
    // add email validation
    setEmailConfirmationVisibility(true);
  }

  function sendSignInLinkToEmail() {
    Auth.sendSignInLinkToEmail(email)
      .then(() => {
        setAuthMailSent(true);
        setSendButtonDisabled(true);
        setTimeout(() => setSendButtonDisabled(false), 10000);

        Ui.showToast(t('init.emailLogin.toast.sentAuthMail'), {
          avoidMenuBar: false,
          showsLong: true,
        });
      })
      .catch(() => {
        Ui.showToast(t('init.emailLogin.toast.failedToAuthWithEmail'), {
          backgroundColor: Ui.color.red,
          avoidMenuBar: false,
          showsLong: true,
        });
      });
  }
}
