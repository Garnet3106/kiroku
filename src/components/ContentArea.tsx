import { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Ui from '../ui';
import PressableHighlight from './pressable/PressableHighlight';

export type ContentAreaProps = {
  insertBottomMargin?: boolean,
  style?: StyleProp<ViewStyle>,
  onPress?: (event: GestureResponderEvent) => void,
  children?: ReactNode,
};

export default function ContentArea(props: ContentAreaProps) {
  const containerStyle = [
    { marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined },
    styles.container,
    props.style,
  ];

  return props.onPress ? (
    <PressableHighlight
      underlayColor={{
        from: Ui.color.white,
        to: Ui.color.background,
      }}
      style={containerStyle}
      onPress={props.onPress}
    >
      {props.children}
    </PressableHighlight>
  ) : (
    <View style={containerStyle}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Ui.color.white,
    borderColor: Ui.color.border.lightGray,
    borderRadius: Ui.dimension.border.radius,
    borderWidth: Ui.dimension.border.width,
    padding: Ui.dimension.margin,
  },
});
