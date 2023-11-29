import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import Ui from '../../ui';
import { ReactNode } from 'react';
import PressableHighlight from '../pressable/PressableHighlight';

export type RectangleButtonProps = Ui.LayoutProps & {
  text: string,
  caption?: string,
  color?: string,
  pressedColor?: string,
  whiteBackground?: boolean,
  icon?: ReactNode,
  disabled?: boolean,
  style?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
  captionStyle?: StyleProp<TextStyle>,
  onPress?: (event: GestureResponderEvent) => void,
};

export default function RectangleButton(props: RectangleButtonProps) {
  const color = props.color ?? Ui.color.main;
  const backgroundColor = props.whiteBackground ? Ui.color.white : color;
  let pressedColor;

  if (props.disabled) {
    pressedColor = backgroundColor;
  } else if (props.pressedColor) {
    pressedColor = props.pressedColor;
  } else if (props.whiteBackground || props.color) {
    pressedColor = backgroundColor;
  } else {
    pressedColor = Ui.color.pressed.main;
  }

  const caption = props.caption && (
    <Text style={[
      styles.caption,
      props.captionStyle,
    ]}>
      {props.caption}
    </Text>
  );

  return (
    <PressableHighlight
      underlayColor={{
        from: backgroundColor,
        to: pressedColor,
      }}
      style={[
        styles.container,
        {
          borderColor: props.whiteBackground ? color : undefined,
          borderWidth: props.whiteBackground ? Ui.dimension.border.width : undefined,
          marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined,
          opacity: props.disabled ? 0.7 : undefined,
        },
        props.style,
      ]}
      onPress={props.disabled ? undefined : props.onPress}
    >
      <View style={styles.textContainer}>
        {props.icon}
        <Text style={[
          styles.text,
          {
            color: props.whiteBackground ? color : Ui.color.white,
            marginLeft: props.icon ? 8 : 0,
          },
          props.textStyle,
        ]}>
          {props.text}
        </Text>
      </View>
      {caption}
    </PressableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: Ui.dimension.border.radius,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
    width: '100%',
  },
  textContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  caption: {
    color: Ui.color.main,
    marginLeft: Ui.dimension.margin / 2,
  },
});
