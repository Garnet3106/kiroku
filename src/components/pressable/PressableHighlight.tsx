import { useRef } from "react";
import { Animated, GestureResponderEvent, InteractionManager, Pressable, PressableProps } from "react-native";
import Ui from "../../ui";

export type PressableHighlightProps = PressableProps & {
  underlayColor: {
    from: string,
    to: string,
  },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PressableHighlight(props: PressableHighlightProps) {
  const animatedBackgroundColor = useRef(new Animated.Value(0)).current;

  const interpolatedBackgroundColor = animatedBackgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [props.underlayColor.from, props.underlayColor.to],
  });

  const style = Ui.joinStyles<any>({
    backgroundColor: interpolatedBackgroundColor,
  }, props.style);

  return (
    <AnimatedPressable
      {...props}
      style={style}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    />
  );

  function onPress(event: GestureResponderEvent) {
    InteractionManager.runAfterInteractions(() => {
      props.onPress && props.onPress(event);
    });
  }

  function onLongPress(event: GestureResponderEvent) {
    InteractionManager.runAfterInteractions(() => {
      props.onLongPress && props.onLongPress(event);
    });
  }

  function onPressIn(event: GestureResponderEvent) {
    Animated.timing(animatedBackgroundColor, {
      toValue: 1,
      duration: 30,
      useNativeDriver: false,
    }).start();

    InteractionManager.runAfterInteractions(() => {
      props.onPressIn && props.onPressIn(event);
    });
  }

  function onPressOut(event: GestureResponderEvent) {
    Animated.timing(animatedBackgroundColor, {
      toValue: 0,
      duration: 60,
      useNativeDriver: false,
    }).start();

    InteractionManager.runAfterInteractions(() => {
      props.onPressOut && props.onPressOut(event);
    });
  }
}