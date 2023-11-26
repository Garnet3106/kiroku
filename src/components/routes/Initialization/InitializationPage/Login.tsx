import { InitializationPageIndex } from '../../../../navigation';
import Ui from '../../../../ui';
import RectangleButton from '../../../input/RectangleButton';
import InitializationPage from './InitializationPage';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';
import { t } from '../../../../translations';

export default function Login() {
  return (
    <InitializationPage
      pageIndex={InitializationPageIndex.Login}
      previous={InitializationPageIndex.Top}
    >
      <Text style={styles.message}>
        {t('init.login.chooseServiceToLogin')}
      </Text>
      <RectangleButton
        text={t('serviceLinking.google')}
        icon={<FontAwesome name='google' color={Ui.color.white} size={22} />}
        onPress={() => {}}
      />
      <RectangleButton
        text={t('serviceLinking.emailAddress')}
        icon={<Feather name='mail' color={Ui.color.white} size={22} style={{ top: 3 }} />}
        style={{ marginTop: Ui.dimension.margin }}
        onPress={() => {}}
      />
    </InitializationPage>
  );
}

const styles = StyleSheet.create({
  message: {
    fontSize: 20,
    marginBottom: Ui.dimension.margin * 1.5,
  },
});
