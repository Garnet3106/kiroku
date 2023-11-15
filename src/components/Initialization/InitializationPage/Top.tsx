import RectangleButton from '../../input/RectangleButton';
import Ui from '../../../ui';
import Redux from '../../../redux/redux';
import { InitializationPageIndex, NavigationRoutePath } from '../../../navigation';
import InitializationPage from './InitializationPage';
import { navigationActions } from '../../../redux/slices/navigation';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import AppLogo from '../../AppLogo';

export default function Top() {
  return (
    <InitializationPage pageIndex={InitializationPageIndex.Top}>
      <View style={styles.top}>
        <Text style={styles.topSlogan}>
        キャッチコピーが入ります
        </Text>
        <AppLogo height={45} />
      </View>
      <RectangleButton
        text='初めての方はこちら'
        onPress={() => {
          Redux.store.dispatch(navigationActions.jumpToInitialization(InitializationPageIndex.RegistrationNickname));
        }}
      />
      <RectangleButton
        text='ログイン'
        style={{ marginTop: Ui.dimension.margin }}
        onPress={() => {
          Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Home));
        }}
      />
      <View style={styles.agreements}>
        <Pressable onPress={() => Linking.openURL('http://kiroku.garnet.works/tos')}>
          <Text style={[
            styles.agreementLink,
            { marginRight: 20 },
          ]}>
            利用規約
          </Text>
        </Pressable>
        <Pressable onPress={() => Linking.openURL('http://kiroku.garnet.works/privacy_policy')}>
          <Text style={styles.agreementLink}>
            プライバシーポリシー
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
