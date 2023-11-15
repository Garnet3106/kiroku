import { useRef } from 'react';
import { Animated, GestureResponderEvent, InteractionManager, Pressable, PressableProps } from 'react-native';
import Ui from '../../ui';

export type PressableOpacityProps = PressableProps & {
  activeOpacity?: number,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PressableOpacity(props: PressableOpacityProps) {
  const animatedOpacity = useRef(new Animated.Value(1)).current;

  const style = Ui.joinStyles<any>({
    opacity: animatedOpacity,
  }, props.style);

  return (
    <AnimatedPressable
      {...props}
      style={style}
      onPress={() => {}}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    />
  );

  function onPressIn(event: GestureResponderEvent) {
    Animated.timing(animatedOpacity, {
      toValue: props.activeOpacity ?? 0.7,
      duration: 40,
      useNativeDriver: false,
    }).start();

    InteractionManager.runAfterInteractions(() => {
      props.onPressIn && props.onPressIn(event);
    });
  }

  function onPressOut(event: GestureResponderEvent) {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 80,
      useNativeDriver: false,
    }).start();

    InteractionManager.runAfterInteractions(() => {
      props.onPressOut && props.onPressOut(event);
      props.onPress && props.onPress(event);
    });
  }
}
