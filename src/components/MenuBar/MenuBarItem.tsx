import { ReactNode } from 'react';
import { ColorValue, Pressable, StyleSheet, Text, View } from 'react-native';
import Redux from '../../redux/redux';
import { Href } from 'expo-router/build/link/href';
import { useRouter } from 'expo-router';

export type MenuBarItemProps = {
  text: string,
  textColor?: ColorValue,
  icon: ReactNode,
  route: Href,
};

export default function MenuBarItem(props: MenuBarItemProps) {
  const router = useRouter();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.icon}>
        {props.icon}
      </View>
      <Text style={[
        styles.text,
        { color: props.textColor },
      ]}>
        {props.text}
      </Text>
    </Pressable>
  );

  function onPress() {
    router.replace(props.route);
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    bottom: 24,
    position: 'absolute',
  },
  text: {
    bottom: 8,
    position: 'absolute',
  },
});
