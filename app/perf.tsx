import RouteContainer from '../src/components/RouteContainer';
import { Text } from 'react-native';
import { t } from '../src/translations';

export default function () {
  return (
    <RouteContainer title={t('taskPerf.taskPerf')}>
      <Text>実績</Text>
    </RouteContainer>
  );
}
