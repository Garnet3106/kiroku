import RouteContainer from '../RouteContainer';
import { NavigationRoutePath } from '../../navigation';
import { Text } from 'react-native';
import { t } from '../../translations';

export default function Settings() {
  return (
    <RouteContainer path={NavigationRoutePath.Settings} title={t('appSettings.appSettings')}>
      <Text>設定</Text>
    </RouteContainer>
  );
}
