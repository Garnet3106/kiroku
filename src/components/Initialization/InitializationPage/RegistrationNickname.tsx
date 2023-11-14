import { InitializationPageIndex } from '../../../navigation';
import RectangleButton from '../../RectangleButton';
import InitializationPage from './InitializationPage';

export default function RegistrationNickname() {
  return (
    <InitializationPage pageIndex={InitializationPageIndex.RegistrationNickname}>
      <RectangleButton
        text="次へ進む"
      />
    </InitializationPage>
  );
}
