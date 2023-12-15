import TextInput from '../../../src/components/input/TextInput';
import Named from '../../../src/components/input/Named';
import InitializationPage from '../../../src/components/InitializationPage';
import { t } from '../../../src/translations';

export default function () {
  return (
    <InitializationPage previous='/init/register/email' next='linkToService'>
      <Named title={t('init.nickname.nickname')} required>
        <TextInput placeholder={t('init.nickname.nicknameExample')} />
      </Named>
    </InitializationPage>
  );
}
