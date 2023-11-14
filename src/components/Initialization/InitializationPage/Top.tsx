import RectangleButton from '../../RectangleButton';
import Ui from '../../../ui';
import Redux from '../../../redux/redux';
import navigation from '../../../redux/slices/navigation';
import { InitializationPageIndex } from '../../../navigation';
import InitializationPage from './InitializationPage';

export default function Top() {
  return (
    <InitializationPage pageIndex={InitializationPageIndex.Top}>
      <RectangleButton
        text="初めての方はこちら"
        style={{ marginBottom: Ui.dimension.margin }}
        onPress={() => {
          Redux.store.dispatch(navigation.jumpToInitialization(InitializationPageIndex.RegistrationNickname));
        }}
      />
      <RectangleButton
        text="ログイン"
        onPress={() => {
        }}
      />
    </InitializationPage>
  );
}
