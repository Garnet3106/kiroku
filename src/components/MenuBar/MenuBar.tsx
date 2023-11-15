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
  const navigationRoutePath = useSelector((state: Redux.RootState) => state.navigation.path);
  const displayed = NavigationRoutePath.getMenuBarDisplayed(navigationRoutePath);

  const getColor = (path: NavigationRoutePath) => path === navigationRoutePath ? Ui.color.main : Ui.color.gray;

  return (
    <View style={[
      styles.container,
      { display: displayed ? undefined : 'none' },
    ]}>
      <MenuBarItem
        text='ホーム'
        textColor={getColor(NavigationRoutePath.Home)}
        icon={(
          <FontAwesome5
            name='home'
            color={getColor(NavigationRoutePath.Home)}
            size={Ui.dimension.menuBar.height - 39}
            bottom={2}
          />
        )}
        route={{ path: NavigationRoutePath.Home }}
      />
      <MenuBarItem
        text='実績'
        textColor={getColor(NavigationRoutePath.Performance)}
        icon={(
          <MaterialCommunityIcons
            name='fire'
            color={getColor(NavigationRoutePath.Performance)}
            size={Ui.dimension.menuBar.height - 30}
          />
        )}
        route={{ path: NavigationRoutePath.Performance }}
      />
      <MenuBarItem
        text='管理'
        textColor={getColor(NavigationRoutePath.Management)}
        icon={(
          <FontAwesome5
            name='pencil-alt'
            color={getColor(NavigationRoutePath.Management)}
            size={Ui.dimension.menuBar.height - 42}
            bottom={5}
          />
        )}
        route={{ path: NavigationRoutePath.Management }}
      />
      <MenuBarItem
        text='設定'
        textColor={getColor(NavigationRoutePath.Settings)}
        icon={(
          <Ionicons
            name='settings-sharp'
            color={getColor(NavigationRoutePath.Settings)}
            size={Ui.dimension.menuBar.height - 37}
            bottom={2}
          />
        )}
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
