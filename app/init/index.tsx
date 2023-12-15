import RectangleButton from '../../src/components/input/RectangleButton';
import Ui from '../../src/ui';
import InitializationPage from '../../src/components/InitializationPage';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import AppLogoJa from '../../src/components/logo/AppLogoJa';
import { t } from '../../src/translations';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export default function () {
  const router = useRouter();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <InitializationPage>
      <View style={styles.top}>
        <Text style={styles.topSlogan}>
          {t('app.slogan')}
        </Text>
        <AppLogoJa height={45} />
      </View>
      <RectangleButton
        text={t('init.top.getStarted')}
        onPress={() => router.replace('/init/register/linkToService')}
      />
      <RectangleButton
        text={t('init.top.login')}
        style={{ marginTop: Ui.dimension.margin }}
        onPress={() => router.replace('/init/login')}
      />
      <View style={styles.agreements}>
        <Pressable onPress={() => Linking.openURL('http://kiroku.garnet.works/tos')}>
          <Text style={[
            styles.agreementLink,
            { marginRight: 20 },
          ]}>
            {t('init.top.tos')}
          </Text>
        </Pressable>
        <Pressable onPress={() => Linking.openURL('http://kiroku.garnet.works/privacy_policy')}>
          <Text style={styles.agreementLink}>
            {t('init.top.privacyPolicy')}
          </Text>
        </Pressable>
      </View>
    </InitializationPage>
  );
}

const styles = StyleSheet.create({
  top: {
    display: 'flex',
    position: 'absolute',
    left: Ui.dimension.margin * 2,
    top: '20%',
    width: '100%',
  },
  topSlogan: {
    color: Ui.color.main,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  agreements: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: Ui.dimension.margin * 2,
    justifyContent: 'center',
  },
  agreementLink: {
    color: Ui.color.main,
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
