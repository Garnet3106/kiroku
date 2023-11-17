import { StyleSheet, Text } from 'react-native';
import Ui from '../ui';
import PressableHighlight from './pressable/PressableHighlight';
import Entypo from '@expo/vector-icons/Entypo';
import Redux from '../redux/redux';
import { navigationActions } from '../redux/slices/navigation';
import { NavigationRoutePath } from '../navigation';

export default function TaskRegistrationButton() {
  return (
    <PressableHighlight
      underlayColor={{
        from: Ui.color.white,
        to: Ui.color.background,
      }}
      style={styles.container}
      onPress={() => Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.TaskEdit))}
    >
      <Entypo name='plus' color={Ui.color.main} size={30} top={2} style={{ margin: -8 }} />
      <Text style={styles.text}>
        作業登録
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
