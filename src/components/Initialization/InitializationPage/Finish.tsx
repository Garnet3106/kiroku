import { StyleSheet, Text } from 'react-native';
import { InitializationPageIndex, NavigationRoutePath } from '../../../navigation';
import RectangleButton from '../../input/RectangleButton';
import InitializationPage from './InitializationPage';
import Ui from '../../../ui';
import Redux from '../../../redux/redux';
import { navigationActions } from '../../../redux/slices/navigation';

export default function Finish() {
  return (
    <InitializationPage pageIndex={InitializationPageIndex.Finish}>
      <Text style={styles.message}>
        利用準備が完了しました！
      </Text>
      <RectangleButton
        text='kiroku を始める'
        onPress={() => Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Home))}
      />
    </InitializationPage>
  );
}

const styles = StyleSheet.create({
  message: {
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: Ui.dimension.margin * 2,
  },
});
