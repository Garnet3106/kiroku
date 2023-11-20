import RouteContainer from '../RouteContainer';
import { NavigationRoutePath } from '../../navigation';
import { Text } from 'react-native';
import { t } from '../../translations';

export default function Performance() {
  return (
    <RouteContainer path={NavigationRoutePath.Performance} title={t('taskPerf.taskPerf')}>
      <Text>実績</Text>
    </RouteContainer>
  );
}
