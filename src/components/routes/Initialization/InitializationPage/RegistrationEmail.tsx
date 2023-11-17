import { InitializationPageIndex } from '../../../../navigation';
import TextInput from '../../../input/TextInput';
import Named from '../../../input/Named';
import InitializationPage from './InitializationPage';

export default function RegistrationEmail() {
  return (
    <InitializationPage
      pageIndex={InitializationPageIndex.RegistrationEmail}
      previous={InitializationPageIndex.RegistrationServiceLinking}
      next={InitializationPageIndex.Finish}
    >
      <Named title='メールアドレス' required>
        <TextInput placeholder='例）...@gmail.com' textContentType='emailAddress' keyboardType='email-address' />
      </Named>
    </InitializationPage>
  );
}
