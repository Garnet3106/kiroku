import { ReactNode } from 'react';
import { ColorValue, ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { NavigationRoutePath } from '../navigation';
import { useSelector } from 'react-redux';
import Redux from '../redux/redux';
import Ui from '../ui';
import { t } from '../translations';

export type RouteContainerProps = {
  path: NavigationRoutePath,
  title?: string,
  backgroundColor?: ColorValue,
  headerDisabled?: boolean,
  scrollable?: boolean,
  style?: StyleProp<ViewStyle>,
  children: ReactNode,
  containerChildren?: ReactNode,
};

export default function RouteContainer(props: RouteContainerProps) {
  const navigation = useSelector((state: Redux.RootState) => state.navigation);
  const menuBarDisplayed = NavigationRoutePath.getMenuBarDisplayed(navigation.path);
  const title = props.title ?? t('app.name');

  const header = !props.headerDisabled && (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        {title}
      </Text>
    </View>
  );

  const bodyBackgroundColor = props.backgroundColor ?? Ui.color.background;

  const body = props.scrollable ? (
    <View style={{
      backgroundColor: bodyBackgroundColor,
      height: '100%',
      overflow: 'hidden',
    }}>
      <ScrollView contentContainerStyle={{ padding: Ui.dimension.margin }}>
        {props.children}
      </ScrollView>
      {props.containerChildren}
    </View>
  ) : (
    <View style={{
      backgroundColor: bodyBackgroundColor,
      height: '100%',
      overflow: 'hidden',
      padding: Ui.dimension.margin,
    }}>
      {props.children}
      {props.containerChildren}
    </View>
  );

  return (
    <View style={[
      styles.container,
      props.style,
      {
        display: navigation.path === props.path ? undefined : 'none',
        paddingBottom: menuBarDisplayed ? Ui.dimension.header.height + Ui.dimension.menuBar.height : 0,
      },
    ]}>
      {header}
      {body}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    alignItems: 'center',
    backgroundColor: Ui.color.white,
    display: 'flex',
    height: Ui.dimension.header.height,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
  },
});
