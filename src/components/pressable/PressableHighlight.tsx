import { useRef } from 'react';
import { Animated, GestureResponderEvent, InteractionManager, Pressable, PressableProps } from 'react-native';

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

  return (
    <AnimatedPressable
      {...props}
      style={[
        props.style as any,
        { backgroundColor: interpolatedBackgroundColor },
      ]}
      onPress={() => {}}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    />
  );

  function onPressIn(event: GestureResponderEvent) {
    Animated.timing(animatedBackgroundColor, {
      toValue: 1,
      duration: 40,
      useNativeDriver: false,
    }).start();

    InteractionManager.runAfterInteractions(() => {
      props.onPressIn && props.onPressIn(event);
    });
  }

  function onPressOut(event: GestureResponderEvent) {
    Animated.timing(animatedBackgroundColor, {
      toValue: 0,
      duration: 80,
      useNativeDriver: false,
    }).start();

    InteractionManager.runAfterInteractions(() => {
      props.onPressOut && props.onPressOut(event);
      props.onPress && props.onPress(event);
    });
  }
}
