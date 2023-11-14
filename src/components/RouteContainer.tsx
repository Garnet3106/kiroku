import { ReactNode } from 'react';
import { ColorValue, ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
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
      { display: navigation.path === props.path ? undefined : 'none' },
    ]}>
      {header}
      <ScrollView style={[
        { backgroundColor: props.backgroundColor ?? Ui.color.background },
        styles.body,
      ]}>
        {props.children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: Ui.dimension.menuBar.height,
  },
  header: {
    alignItems: 'center',
    backgroundColor: Ui.color.white,
    display: 'flex',
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 16,
  },
  body: {
    height: '100%',
  },
});