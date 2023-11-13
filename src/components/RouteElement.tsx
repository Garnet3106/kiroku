import { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { NavigationRoutePath } from '../navigation';
import { useSelector } from 'react-redux';
import Redux from '../redux/redux';

export type RouteElementProps = {
  path: NavigationRoutePath,
  style?: StyleProp<ViewStyle>,
  children: ReactNode,
};

export default function RouteElement(props: RouteElementProps) {
  const navigation = useSelector((state: Redux.RootState) => state.navigation);

  return (
    <View style={[
      props.style,
      { display: navigation.path === props.path ? undefined : 'none' },
    ]}>
      {props.children}
    </View>
  );
}
