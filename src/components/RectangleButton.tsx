import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import Ui from '../ui';
import { ReactNode } from 'react';

export type RectangleButtonProps = {
  text: string,
  icon?: ReactNode,
  style?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
  onPress?: (event: GestureResponderEvent) => void,
};

export default function RectangleButton(props: RectangleButtonProps) {
  return (
    <Pressable
      style={[
        styles.container,
        props.style,
      ]}
      onPress={props.onPress}
    >
      {props.icon}
      <Text style={[
        styles.text,
        props.textStyle,
      ]}>
        {props.text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Ui.color.main,
    borderRadius: Ui.dimension.border.radius,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
    width: '100%',
  },
  text: {
    color: Ui.color.white,
    fontSize: 18,
  },
});
