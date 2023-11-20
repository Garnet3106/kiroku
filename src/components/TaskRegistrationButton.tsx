import { StyleSheet, Text } from 'react-native';
import Ui from '../ui';
import PressableHighlight from './pressable/PressableHighlight';
import Entypo from '@expo/vector-icons/Entypo';
import Redux from '../redux/redux';
import { navigationActions } from '../redux/slices/navigation';
import { NavigationRoutePath } from '../navigation';
import { t } from '../translations';

export default function TaskRegistrationButton() {
  return (
    <PressableHighlight
      underlayColor={{
        from: Ui.color.white,
        to: Ui.color.pressed.mainOnWhite,
      }}
      style={styles.container}
      onPress={() => Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.TaskEdit))}
    >
      <Entypo name='plus' color={Ui.color.main} size={30} top={1} style={{ margin: -4 }} />
      <Text style={styles.text}>
        {t('taskMgmt.newTask')}
      </Text>
    </PressableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: Ui.color.main,
    borderRadius: 100,
    borderWidth: Ui.dimension.border.width,
    bottom: Ui.dimension.margin,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 12,
    paddingTop: 9,
    paddingHorizontal: 20,
    position: 'absolute',
    right: Ui.dimension.margin,
  },
  text: {
    color: Ui.color.main,
    fontSize: 22,
    marginLeft: 8,
  },
});
