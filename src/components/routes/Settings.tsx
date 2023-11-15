import RouteContainer from '../RouteContainer';
import { NavigationRoutePath } from '../../navigation';
import { Text } from 'react-native';

export default function Settings() {
  return (
    <RouteContainer path={NavigationRoutePath.Settings}>
      <Text>設定</Text>
    </RouteContainer>
  );
}
