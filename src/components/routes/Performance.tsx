import RouteContainer from '../RouteContainer';
import { NavigationRoutePath } from '../../navigation';
import { Text } from 'react-native';

export default function Performance() {
  return (
    <RouteContainer path={NavigationRoutePath.Performance} title='作業実績'>
      <Text>実績</Text>
    </RouteContainer>
  );
}
