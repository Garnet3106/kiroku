import RouteContainer from '../RouteContainer';
import { NavigationRoutePath } from '../../navigation';
import Ui from '../../ui';
import Top from './InitializationPage/Top';
import RegistrationNickname from './InitializationPage/RegistrationNickname';
import RegistrationServiceLinking from './InitializationPage/RegistrationServiceLinking';
import RegistrationEmail from './InitializationPage/RegistrationEmail';
import Finish from './InitializationPage/Finish';

export default function Initialization() {
  return (
    <RouteContainer
      path={NavigationRoutePath.Initialization}
      backgroundColor={Ui.color.white}
      headerDisabled
    >
      <Top />
      <RegistrationNickname />
      <RegistrationServiceLinking />
      <RegistrationEmail />
      <Finish />
    </RouteContainer>
  );
}
