import { StyleSheet, View } from 'react-native';
import Ui from '../../ui';
import { useSelector } from 'react-redux';
import Redux from '../../redux/redux';
import { NavigationRoutePath } from '../../navigation';
import MenuBarItem from './MenuBarItem';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MenuBar() {
  const displayed = useSelector((state: Redux.RootState) => NavigationRoutePath.getMenuBarDisplayed(state.navigation.path));

  const iconProps = {
    color: Ui.color.main,
  };

  return (
    <View style={[
      styles.container,
      { display: displayed ? undefined : 'none' },
    ]}>
      <MenuBarItem
        text='ホーム'
        textColor={Ui.color.main}
        icon={<FontAwesome5 name='home' {...iconProps} size={Ui.dimension.menuBar.height - 39} bottom={2} />}
        route={{ path: NavigationRoutePath.Home }}
      />
      <MenuBarItem
        text='実績'
        textColor={Ui.color.main}
        icon={<MaterialCommunityIcons name='fire' {...iconProps} size={Ui.dimension.menuBar.height - 30} />}
        route={{ path: NavigationRoutePath.Performance }}
      />
      <MenuBarItem
        text='管理'
        textColor={Ui.color.main}
        icon={<FontAwesome5 name='pencil-alt' {...iconProps} size={Ui.dimension.menuBar.height - 42} bottom={5} />}
        route={{ path: NavigationRoutePath.Management }}
      />
      <MenuBarItem
        text='設定'
        textColor={Ui.color.main}
        icon={<Ionicons name='settings-sharp' {...iconProps} size={Ui.dimension.menuBar.height - 37} bottom={2} />}
        route={{ path: NavigationRoutePath.Settings }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Ui.color.white,
    borderTopColor: Ui.color.border.lightGray,
    borderTopWidth: Ui.dimension.border.width,
    display: 'flex',
    flexDirection: 'row',
    height: Ui.dimension.menuBar.height,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
  },
});
