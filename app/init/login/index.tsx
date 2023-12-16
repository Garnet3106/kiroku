import Ui from '../../../src/ui';
import RectangleButton from '../../../src/components/input/RectangleButton';
import InitializationPage from '../../../src/components/InitializationPage';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';
import { t } from '../../../src/translations';
import { Auth, User } from '../../../src/auth';
import { useState } from 'react';
import { Database } from '../../../src/database';
import { useRouter } from 'expo-router';

export default function () {
  const router = useRouter();
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  return (
    <InitializationPage previous='/init'>
      <Text style={styles.message}>
        {t('init.login.chooseServiceToLogin')}
      </Text>
      <RectangleButton
        text={t('serviceLinking.google')}
        icon={<FontAwesome name='google' color={Ui.color.white} size={22} />}
        disabled={buttonsDisabled}
        onPress={signInWithGoogle}
      />
      <RectangleButton
        text={t('serviceLinking.emailAddress')}
        icon={<Feather name='mail' color={Ui.color.white} size={22} style={{ top: 3 }} />}
        disabled={buttonsDisabled}
        style={{ marginTop: Ui.dimension.margin }}
        onPress={() => router.replace('/init/login/email')}
      />
    </InitializationPage>
  );

  function signInWithGoogle() {
    setButtonsDisabled(true);

    Auth.signInWithGoogle()
      .then((user) => {
        Database.signIn(User.create(user.displayName ?? undefined))
          .then(() => {
            Ui.showToast(t('init.login.toast.loggedIn'));
            router.replace('/home');
            setButtonsDisabled(false);
          })
          .catch(() => Ui.showToast('INTERNAL USER ERROR', [Ui.getErrorToastOptions(), { avoidMenuBar: false }]));
      })
      .catch(() => {
        Ui.showToast(t('init.login.toast.failedToLogin'), [Ui.getErrorToastOptions(), { avoidMenuBar: false }]);
        setButtonsDisabled(false);
      });
  }
}

const styles = StyleSheet.create({
  message: {
    fontSize: 20,
    marginBottom: Ui.dimension.margin * 1.5,
  },
});
