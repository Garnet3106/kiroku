import RouteContainer from '../RouteContainer';
import { NavigationRoutePath } from '../../navigation';
import { Text } from 'react-native';

export default function Management() {
  return (
    <RouteContainer path={NavigationRoutePath.Management}>
      <Text>管理</Text>
    </RouteContainer>
  );
}
