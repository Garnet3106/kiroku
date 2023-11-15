import { StyleProp, StyleSheet, ViewStyle, View, Text } from 'react-native';
import { InitializationPageIndex } from '../../../../navigation';
import { ReactNode } from 'react';
import Redux from '../../../../redux/redux';
import { useSelector } from 'react-redux';
import Ui from '../../../../ui';
import Ionicons from '@expo/vector-icons/Ionicons';
import RectangleButton from '../../../input/RectangleButton';
import { navigationActions } from '../../../../redux/slices/navigation';
import PressableHighlight from '../../../pressable/PressableHighlight';

export type InitializationPageProps = {
  pageIndex: InitializationPageIndex,
  previous?: InitializationPageIndex,
  next?: InitializationPageIndex,
  progress?: number,
  style?: StyleProp<ViewStyle>,
  children: ReactNode,
};

export default function InitializationPage(props: InitializationPageProps) {
  const navigation = useSelector((state: Redux.RootState) => state.navigation);
  const pageIndex = navigation.params && navigation.params.pageIndex;
  const displayed = pageIndex === props.pageIndex;

  const previousButton = props.previous !== undefined && (
    <PressableHighlight
      underlayColor={{
        from: Ui.color.main,
        to: Ui.color.pressed.main,
      }}
      style={styles.previous}
      onPress={() => Redux.store.dispatch(navigationActions.jumpToInitialization(props.previous!))}
    >
      <Ionicons name='chevron-back' color={Ui.color.white} size={20} style={{ marginLeft: -7 }} />
      <Text style={styles.previousText}>
        前に戻る
      </Text>
    </PressableHighlight>
  );

  const nextButton = props.next !== undefined && (
    <RectangleButton
      text='次へ進む'
      style={{ marginTop: Ui.dimension.margin * 2 }}
      onPress={() => Redux.store.dispatch(navigationActions.jumpToInitialization(props.next!))}
    />
  );

  return (
    <View style={[
      styles.container,
      props.style,
      {
        display: displayed ? undefined : 'none',
        paddingBottom: props.previous !== undefined ? 50 : 0,
      },
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
