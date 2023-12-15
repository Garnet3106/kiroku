import { useState } from 'react';
import { Auth } from '../../../src/auth';
import { t } from '../../../src/translations';
import Ui from '../../../src/ui';
import TextInput from '../../../src/components/input/TextInput';
import InitializationPage from '../../../src/components/InitializationPage';
import Named from '../../../src/components/input/Named';
import RectangleButton from '../../../src/components/input/RectangleButton';
import Dialog from 'react-native-dialog';

export default function () {
  const [email, setEmail] = useState('');
  const [authMailSent, setAuthMailSent] = useState(false);
  const [emailConfirmationVisibility, setEmailConfirmationVisibility] = useState(false);
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);

  return (
    <InitializationPage previous='/init/login'>
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
