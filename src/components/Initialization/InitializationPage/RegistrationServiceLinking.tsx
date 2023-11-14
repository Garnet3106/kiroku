import { InitializationPageIndex } from '../../../navigation';
import Ui from '../../../ui';
import RectangleButton from '../../input/RectangleButton';
import InitializationPage from './InitializationPage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Redux from '../../../redux/redux';
import { navigationActions } from '../../../redux/slices/navigation';
import { StyleSheet, Text } from 'react-native';

export default function RegistrationServiceLinking() {
  return (
    <InitializationPage
      pageIndex={InitializationPageIndex.RegistrationServiceLinking}
      previous={InitializationPageIndex.RegistrationNickname}
    >
      <Text style={styles.message}>
        アプリに連携させるサービスを選択してください
      </Text>
      <Text style={styles.messageCaption}>
        * 次回以降のログインで使用します
      </Text>
      <RectangleButton
        text="Google"
        icon={<FontAwesome name="google" color={Ui.color.white} size={22} />}
      />
      <RectangleButton
        text="メールアドレス"
        icon={<Feather name="mail" color={Ui.color.white} size={22} />}
        style={{ marginTop: Ui.dimension.margin }}
        onPress={() => Redux.store.dispatch(navigationActions.jumpToInitialization(InitializationPageIndex.RegistrationEmail))}
      />
    </InitializationPage>
  );
}

const styles = StyleSheet.create({
  message: {
    fontSize: 20,
    marginBottom: Ui.dimension.margin,
  },
  messageCaption: {
    fontSize: 16,
    marginBottom: Ui.dimension.margin * 1.5,
  },
});
