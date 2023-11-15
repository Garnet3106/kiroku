import { InitializationPageIndex } from '../../../navigation';
import TextInput from '../../input/TextInput';
import TitlePair from '../../input/TitlePair';
import InitializationPage from './InitializationPage';

export default function RegistrationEmail() {
  return (
    <InitializationPage
      pageIndex={InitializationPageIndex.RegistrationEmail}
      previous={InitializationPageIndex.RegistrationServiceLinking}
      next={InitializationPageIndex.Finish}
    >
      <TitlePair title='メールアドレス' required>
        <TextInput placeholder='例）...@gmail.com' textContentType='emailAddress' keyboardType='email-address' />
      </TitlePair>
    </InitializationPage>
  );
}
