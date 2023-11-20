import { InitializationPageIndex } from '../../../../navigation';
import TextInput from '../../../input/TextInput';
import Named from '../../../input/Named';
import InitializationPage from './InitializationPage';
import { t } from '../../../../translations';

export default function RegistrationNickname() {
  return (
    <InitializationPage
      pageIndex={InitializationPageIndex.RegistrationNickname}
      previous={InitializationPageIndex.Top}
      next={InitializationPageIndex.RegistrationServiceLinking}
    >
      <Named title={t('init.nickname.nickname')} required>
        <TextInput placeholder={t('init.nickname.nicknameExample')} />
      </Named>
    </InitializationPage>
  );
}
