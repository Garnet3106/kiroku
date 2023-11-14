import { StyleSheet, Text, View } from 'react-native';
import Ui from '../../ui';
import { useSelector } from 'react-redux';
import Redux from '../../redux/redux';
import { NavigationRoutePath } from '../../navigation';

export default function MenuBar() {
  const displayed = useSelector((state: Redux.RootState) => NavigationRoutePath.getMenuBarDisplayed(state.navigation.path));

  return (
    <View style={[
      styles.container,
      { display: displayed ? undefined : 'none' },
    ]}>
      <Text>MenuBar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Ui.color.white,
    borderTopColor: Ui.color.border.gray,
    borderTopWidth: Ui.dimension.border.width,
    height: Ui.dimension.menuBar.height,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
  },
});
