import RouteContainer from '../RouteContainer';
import { NavigationRoutePath } from '../../navigation';
import Ui from '../../ui';
import Top from './InitializationPage/Top';
import RegistrationNickname from './InitializationPage/RegistrationNickname';
import RegistrationServiceLinking from './InitializationPage/RegistrationServiceLinking';

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
    </RouteContainer>
  );
}
