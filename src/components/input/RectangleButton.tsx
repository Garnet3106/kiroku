import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import Ui from '../../ui';
import { ReactNode } from 'react';
import PressableHighlight from '../pressable/PressableHighlight';

export type RectangleButtonProps = {
  text: string,
  icon?: ReactNode,
  style?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
  onPress?: (event: GestureResponderEvent) => void,
};

export default function RectangleButton(props: RectangleButtonProps) {
  return (
    <PressableHighlight
      underlayColor={{
        from: Ui.color.main,
        to: Ui.color.pressed.main,
      }}
      style={[
        styles.container,
        props.style,
      ]}
      onPress={props.onPress}
    >
      {props.icon}
      <Text style={[
        styles.text,
        { marginLeft: props.icon ? 8 : 0 },
        props.textStyle,
      ]}>
        {props.text}
      </Text>
    </PressableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
