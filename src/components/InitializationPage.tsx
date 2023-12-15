import { StyleProp, StyleSheet, ViewStyle, View, Text } from 'react-native';
import { ReactNode } from 'react';
import Ui from '../ui';
import { Ionicons } from '@expo/vector-icons';
import RectangleButton from './input/RectangleButton';
import PressableHighlight from './pressable/PressableHighlight';
import { t } from '../translations';
import { useRouter } from 'expo-router';
import { Href } from 'expo-router/build/link/href';

export type InitializationPageProps = {
  previous?: Href,
  next?: Href,
  progress?: number,
  style?: StyleProp<ViewStyle>,
  children: ReactNode,
};

export default function InitializationPage(props: InitializationPageProps) {
  const router = useRouter();

  const previousButton = props.previous && (
    <PressableHighlight
      underlayColor={{
        from: Ui.color.main,
        to: Ui.color.pressed.main,
      }}
      style={styles.previous}
      onPress={() => router.replace(props.previous!)}
    >
      <Ionicons name='chevron-back' color={Ui.color.white} size={20} style={{ marginLeft: -7 }} />
      <Text style={styles.previousText}>
        {t('init.back')}
      </Text>
    </PressableHighlight>
  );

  const nextButton = props.next !== undefined && (
    <RectangleButton
      text={t('init.next')}
      style={{ marginTop: Ui.dimension.margin * 2 }}
      onPress={() => router.replace(props.next!)}
    />
  );

  return (
    <View style={[
      styles.container,
      props.style,
      { paddingBottom: props.previous ? 50 : 0 },
    ]}>
      {previousButton}
      {props.children}
      {nextButton}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: Ui.dimension.margin * 2,
  },
  previous: {
    alignSelf: 'flex-start',
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: Ui.dimension.margin * 2,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  previousText: {
    color: Ui.color.white,
    fontWeight: 'bold',
  },
});
