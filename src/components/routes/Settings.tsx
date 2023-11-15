import RouteContainer from '../RouteContainer';
import { NavigationRoutePath } from '../../navigation';
import { Text } from 'react-native';

export default function Settings() {
  return (
    <RouteContainer path={NavigationRoutePath.Settings} title='アプリ設定'>
      <Text>設定</Text>
    </RouteContainer>
  );
}
