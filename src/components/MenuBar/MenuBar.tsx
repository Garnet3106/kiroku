import { StyleSheet, View } from 'react-native';
import Ui from '../../ui';
import MenuBarItem from './MenuBarItem';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { t } from '../../translations';
import { usePathname } from 'expo-router';
import { Href } from 'expo-router/build/link/href';

export function getDisplayed(pathname: string): boolean {
  return !(pathname.startsWith('/init') || pathname === '/task/finish');
}

export default function MenuBar() {
  const pathname = usePathname();
  const displayed = getDisplayed(pathname);
  const getColor = (path: Href) => path === pathname ? Ui.color.main : Ui.color.gray;

  return (
    <View style={[
      styles.container,
      { display: displayed ? undefined : 'none' },
    ]}>
      <MenuBarItem
        text={t('menuBar.home')}
        textColor={getColor('/home')}
        icon={(
          <FontAwesome5
            name='home'
            color={getColor('/home')}
            size={Ui.dimension.menuBar.height - 39}
            bottom={2}
          />
        )}
        route='/home'
      />
      <MenuBarItem
        text={t('menuBar.perf')}
        textColor={getColor('/perf')}
        icon={(
          <MaterialCommunityIcons
            name='fire'
            color={getColor('/perf')}
            size={Ui.dimension.menuBar.height - 30}
          />
        )}
        route='/perf'
      />
      <MenuBarItem
        text={t('menuBar.mgmt')}
        textColor={getColor('/manage')}
        icon={(
          <FontAwesome5
            name='pencil-alt'
            color={getColor('/manage')}
            size={Ui.dimension.menuBar.height - 42}
            bottom={5}
          />
        )}
        route='/manage'
      />
      <MenuBarItem
        text={t('menuBar.settings')}
        textColor={getColor('/settings')}
        icon={(
          <Ionicons
            name='settings-sharp'
            color={getColor('/settings')}
            size={Ui.dimension.menuBar.height - 37}
            bottom={2}
          />
        )}
        route='/settings'
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
