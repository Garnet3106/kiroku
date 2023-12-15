import Ui from '../../../src/ui';
import RectangleButton from '../../../src/components/input/RectangleButton';
import InitializationPage from '../../../src/components/InitializationPage';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';
import { t } from '../../../src/translations';
import { useRouter } from 'expo-router';

export default function () {
  const router = useRouter();

  return (
    <InitializationPage previous='/init'>
      <Text style={styles.message}>
        {t('init.serviceLinking.chooseLinkingService')}
      </Text>
      <Text style={styles.messageCaption}>
        {'* ' + t('init.serviceLinking.caption')}
      </Text>
      <RectangleButton
        text={t('serviceLinking.google')}
        icon={<FontAwesome name='google' color={Ui.color.white} size={22} />}
      />
      <RectangleButton
        text={t('serviceLinking.emailAddress')}
        icon={<Feather name='mail' color={Ui.color.white} size={22} style={{ top: 3 }} />}
        style={{ marginTop: Ui.dimension.margin }}
        onPress={() => router.replace('/init/register/email')}
      />
    </InitializationPage>
  );
}

const styles = StyleSheet.create({
  message: {
    fontSize: 20,
    marginBottom: 5,
  },
  messageCaption: {
    color: Ui.color.gray,
    fontSize: 16,
    marginBottom: Ui.dimension.margin * 1.5,
  },
});
