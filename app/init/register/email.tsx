import TextInput from '../../../src/components/input/TextInput';
import Named from '../../../src/components/input/Named';
import InitializationPage from '../../../src/components/InitializationPage';
import { t } from '../../../src/translations';

export default function () {
  return (
    <InitializationPage previous='/init/register/linkToService' next='/init/register/finish'>
      <Named title={t('init.registrationEmail.emailAddress')} required>
        <TextInput placeholder={t('init.registrationEmail.emailAddressExample')} textContentType='emailAddress' keyboardType='email-address' />
      </Named>
    </InitializationPage>
  );
}
