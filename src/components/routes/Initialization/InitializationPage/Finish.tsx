import { StyleSheet, Text } from 'react-native';
import { InitializationPageIndex, NavigationRoutePath } from '../../../../navigation';
import RectangleButton from '../../../input/RectangleButton';
import InitializationPage from './InitializationPage';
import Ui from '../../../../ui';
import Redux from '../../../../redux/redux';
import { navigationActions } from '../../../../redux/slices/navigation';
import { t } from '../../../../translations';

export default function Finish() {
  return (
    <InitializationPage pageIndex={InitializationPageIndex.Finish} style={{ bottom: 35 }}>
      <Text style={styles.title}>
        {t('init.finish.completed')}
      </Text>
      <Text style={styles.message}>
        {t('init.finish.letsGetStarted')}
      </Text>
      <RectangleButton
        text={t('init.finish.continueToTop')}
        onPress={() => Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Home))}
      />
    </InitializationPage>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: Ui.dimension.margin * 2,
  },
});
