import { InitializationPageIndex } from '../../../../navigation';
import TextInput from '../../../input/TextInput';
import Named from '../../../input/Named';
import InitializationPage from './InitializationPage';
import { t } from '../../../../translations';

export default function RegistrationEmail() {
  return (
    <InitializationPage
      pageIndex={InitializationPageIndex.RegistrationEmail}
      previous={InitializationPageIndex.RegistrationServiceLinking}
      next={InitializationPageIndex.Finish}
    >
      <Named title={t('init.registrationEmail.emailAddress')} required>
        <TextInput placeholder={t('init.registrationEmail.emailAddressExample')} textContentType='emailAddress' keyboardType='email-address' />
      </Named>
    </InitializationPage>
  );
}
