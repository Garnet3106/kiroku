import RouteContainer from '../RouteContainer';
import { NavigationRoutePath } from '../../navigation';
import { Text } from 'react-native';

export default function Home() {
  return (
    <RouteContainer path={NavigationRoutePath.Home}>
      <Text>ホーム</Text>
    </RouteContainer>
  );
}
