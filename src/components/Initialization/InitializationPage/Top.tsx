import RectangleButton from '../../input/RectangleButton';
import Ui from '../../../ui';
import Redux from '../../../redux/redux';
import { InitializationPageIndex } from '../../../navigation';
import InitializationPage from './InitializationPage';
import { navigationActions } from '../../../redux/slices/navigation';

export default function Top() {
  return (
    <InitializationPage pageIndex={InitializationPageIndex.Top}>
      <RectangleButton
        text="初めての方はこちら"
        onPress={() => {
          Redux.store.dispatch(navigationActions.jumpToInitialization(InitializationPageIndex.RegistrationNickname));
        }}
      />
      <RectangleButton
        text="ログイン"
        style={{ marginTop: Ui.dimension.margin }}
        onPress={() => {
        }}
      />
    </InitializationPage>
  );
}
