import { StyleSheet, Text } from 'react-native';
import RectangleButton from '../../../src/components/input/RectangleButton';
import InitializationPage from '../../../src/components/InitializationPage';
import Ui from '../../../src/ui';
import { t } from '../../../src/translations';
import { useRouter } from 'expo-router';

export default function () {
  const router = useRouter();

  return (
    <InitializationPage style={{ bottom: 35 }}>
      <Text style={styles.title}>
        {t('init.finish.completed')}
      </Text>
      <Text style={styles.message}>
        {t('init.finish.letsGetStarted')}
      </Text>
      <RectangleButton
        text={t('init.finish.continueToTop')}
        onPress={() => router.replace('/home')}
      />
    </InitializationPage>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: Ui.dimension.margin * 2,
  },
});
