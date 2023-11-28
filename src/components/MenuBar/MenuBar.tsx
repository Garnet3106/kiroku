import { StyleSheet, View } from 'react-native';
import Ui from '../../ui';
import { useSelector } from 'react-redux';
import Redux from '../../redux/redux';
import { NavigationRoutePath } from '../../navigation';
import MenuBarItem from './MenuBarItem';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { t } from '../../translations';

export default function MenuBar() {
  const navigationRoutePath = useSelector((state: Redux.RootState) => state.navigation?.path);
  const displayed = navigationRoutePath ? NavigationRoutePath.getMenuBarDisplayed(navigationRoutePath) : false;
  const getColor = (path: NavigationRoutePath) => path === navigationRoutePath ? Ui.color.main : Ui.color.gray;

  return (
    <View style={[
      styles.container,
      { display: displayed ? undefined : 'none' },
    ]}>
      <MenuBarItem
        text={t('menuBar.home')}
        textColor={getColor(NavigationRoutePath.Home)}
        icon={(
          <FontAwesome5
            name='home'
            color={getColor(NavigationRoutePath.Home)}
            size={Ui.dimension.menuBar.height - 39}
            bottom={2}
          />
        )}
        route={{
          path: NavigationRoutePath.Home,
          params: {},
        }}
      />
      <MenuBarItem
        text={t('menuBar.perf')}
        textColor={getColor(NavigationRoutePath.Performance)}
        icon={(
          <MaterialCommunityIcons
            name='fire'
            color={getColor(NavigationRoutePath.Performance)}
            size={Ui.dimension.menuBar.height - 30}
          />
        )}
        route={{
          path: NavigationRoutePath.Performance,
          params: {},
        }}
      />
      <MenuBarItem
        text={t('menuBar.mgmt')}
        textColor={getColor(NavigationRoutePath.Management)}
        icon={(
          <FontAwesome5
            name='pencil-alt'
            color={getColor(NavigationRoutePath.Management)}
            size={Ui.dimension.menuBar.height - 42}
            bottom={5}
          />
        )}
        route={{
          path: NavigationRoutePath.Management,
          params: {},
        }}
      />
      <MenuBarItem
        text={t('menuBar.settings')}
        textColor={getColor(NavigationRoutePath.Settings)}
        icon={(
          <Ionicons
            name='settings-sharp'
            color={getColor(NavigationRoutePath.Settings)}
            size={Ui.dimension.menuBar.height - 37}
            bottom={2}
          />
        )}
        route={{
          path: NavigationRoutePath.Settings,
          params: {},
        }}
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
