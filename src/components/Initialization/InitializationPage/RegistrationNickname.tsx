import { InitializationPageIndex } from '../../../navigation';
import TextInput from '../../input/TextInput';
import TitlePair from '../../input/TitlePair';
import InitializationPage from './InitializationPage';

export default function RegistrationNickname() {
  return (
    <InitializationPage
      pageIndex={InitializationPageIndex.RegistrationNickname}
      previous={InitializationPageIndex.Top}
      next={InitializationPageIndex.RegistrationServiceLinking}
    >
      <TitlePair title='ニックネーム' required>
        <TextInput placeholder='例）きろくたろー' />
      </TitlePair>
    </InitializationPage>
  );
}
