import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Ui from '../../../ui';
import Entypo from '@expo/vector-icons/Entypo';
import ContentArea from '../../ContentArea';
import Redux from '../../../redux/redux';
import { navigationActions } from '../../../redux/slices/navigation';
import { NavigationRoutePath } from '../../../navigation';

export type TaskItemProps = {
  insertBottomMargin?: boolean,
  style?: StyleProp<ViewStyle>,
};

export default function TaskItem(props: TaskItemProps) {
  const descriptions = ['毎週火曜日', '120分', '休憩あり'];

  return (
    <ContentArea
      style={[
        styles.container,
        { marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined },
        props.style,
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Entypo name='book' color={Ui.color.black} size={20} top={3} style={{ marginRight: 3 }} />
        <View>
          <Text style={styles.title}>
            作業タイトル
          </Text>
          <Text style={styles.description}>
            {descriptions.join(' ･ ')}
          </Text>
        </View>
      </View>
      <Entypo name='chevron-right' color={Ui.color.gray} size={30} />
    </ContentArea>
  );

  function onPress() {
    Redux.store.dispatch(navigationActions.jumpToWithParams({
      path: NavigationRoutePath.TaskStart,
    }));
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Ui.dimension.border.radius,
    backgroundColor: Ui.color.background,
    overflow: 'hidden',
    padding: Ui.dimension.margin,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    marginBottom: 2,
  },
  description: {
    color: Ui.color.gray,
  },
});
