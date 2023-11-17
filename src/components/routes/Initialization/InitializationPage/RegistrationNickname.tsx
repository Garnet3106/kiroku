import { InitializationPageIndex } from '../../../../navigation';
import TextInput from '../../../input/TextInput';
import Named from '../../../input/Named';
import InitializationPage from './InitializationPage';

export default function RegistrationNickname() {
  return (
    <InitializationPage
      pageIndex={InitializationPageIndex.RegistrationNickname}
      previous={InitializationPageIndex.Top}
      next={InitializationPageIndex.RegistrationServiceLinking}
    >
      <Named title='ニックネーム' required>
        <TextInput placeholder='例）きろくたろー' />
      </Named>
    </InitializationPage>
  );
}
