import { ReactNode } from 'react';
import { ColorValue, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { NavigationRoutePath } from '../navigation';
import { useSelector } from 'react-redux';
import Redux from '../redux/redux';
import Ui from '../ui';

export type RouteContainerProps = {
  path: NavigationRoutePath,
  title?: string,
  backgroundColor?: ColorValue,
  headerDisabled?: boolean,
  style?: StyleProp<ViewStyle>,
  children: ReactNode,
};

export default function RouteContainer(props: RouteContainerProps) {
  const navigation = useSelector((state: Redux.RootState) => state.navigation);
  const menuBarDisplayed = NavigationRoutePath.getMenuBarDisplayed(navigation.path);
  const title = props.title ?? 'kiroku';

  const header = !props.headerDisabled && (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        {title}
      </Text>
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
      <View style={[
        { backgroundColor: props.backgroundColor ?? Ui.color.background },
        styles.body,
      ]}>
        {props.children}
      </View>
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
  body: {
    height: '100%',
    padding: Ui.dimension.margin,
  },
});
