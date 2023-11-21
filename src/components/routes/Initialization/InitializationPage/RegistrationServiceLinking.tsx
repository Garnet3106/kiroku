import { InitializationPageIndex } from '../../../../navigation';
import Ui from '../../../../ui';
import RectangleButton from '../../../input/RectangleButton';
import InitializationPage from './InitializationPage';
import { Feather, FontAwesome } from '@expo/vector-icons';
import Redux from '../../../../redux/redux';
import { navigationActions } from '../../../../redux/slices/navigation';
import { StyleSheet, Text } from 'react-native';
import { t } from '../../../../translations';

export default function RegistrationServiceLinking() {
  return (
    <InitializationPage
      pageIndex={InitializationPageIndex.RegistrationServiceLinking}
      previous={InitializationPageIndex.RegistrationNickname}
    >
      <Text style={styles.message}>
        {t('init.serviceLinking.chooseLinkingService')}
      </Text>
      <Text style={styles.messageCaption}>
        {'* ' + t('init.serviceLinking.caption')}
      </Text>
      <RectangleButton
        text={t('init.serviceLinking.google')}
        icon={<FontAwesome name='google' color={Ui.color.white} size={22} />}
      />
      <RectangleButton
        text={t('init.serviceLinking.emailAddress')}
        icon={<Feather name='mail' color={Ui.color.white} size={22} style={{ top: 3 }} />}
        style={{ marginTop: Ui.dimension.margin }}
        onPress={() => Redux.store.dispatch(navigationActions.jumpToInitialization(InitializationPageIndex.RegistrationEmail))}
      />
    </InitializationPage>
  );
}

const styles = StyleSheet.create({
  message: {
    fontSize: 20,
    marginBottom: 5,
  },
  messageCaption: {
    color: Ui.color.gray,
    fontSize: 16,
    marginBottom: Ui.dimension.margin * 1.5,
  },
});
