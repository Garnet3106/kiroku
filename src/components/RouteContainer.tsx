import { ReactNode } from 'react';
import { ColorValue, ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Ui from '../ui';
import { t } from '../translations';
import { getDisplayed } from './MenuBar/MenuBar';
import { usePathname } from 'expo-router';

export type RouteContainerProps = {
  title?: string,
  backgroundColor?: ColorValue,
  headerDisabled?: boolean,
  scrollable?: boolean,
  style?: StyleProp<ViewStyle>,
  children: ReactNode,
  containerChildren?: ReactNode,
};

export default function RouteContainer(props: RouteContainerProps) {
  const pathname = usePathname();
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
      { paddingBottom: getDisplayed(pathname) ? Ui.dimension.header.height + Ui.dimension.menuBar.height : 0 },
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
