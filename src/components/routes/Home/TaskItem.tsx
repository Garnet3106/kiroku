import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Ui from '../../../ui';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ContentArea from '../../ContentArea';
import Redux from '../../../redux/redux';
import { navigationActions } from '../../../redux/slices/navigation';
import { NavigationRoutePath } from '../../../navigation';

export type TaskItemProps = {
  insertBottomMargin?: boolean,
  style?: StyleProp<ViewStyle>,
};

export default function TaskItem(props: TaskItemProps) {
  return (
    <ContentArea
      style={[
        { marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined },
        props.style,
      ]}
      onPress={onPress}
    >
      <View style={styles.row}>
        <View style={styles.rowChild}>
          <Entypo name='book' color={Ui.color.black} size={20} top={2} style={{ marginRight: 3 }} />
          <Text style={styles.title}>
            作業タイトル
          </Text>
        </View>
        <View style={styles.rowChild}>
          <MaterialIcons name='access-time' color={Ui.color.gray} size={20} top={1} />
          <Text style={styles.status}>
            残り20分
          </Text>
          <Entypo name='chevron-right' color={Ui.color.gray} size={30} top={1} />
        </View>
      </View>
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
  },
  title: {
    fontSize: 18,
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowChild: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  status: {
    color: Ui.color.gray,
    marginLeft: 1,
    marginRight: 4,
  },
});
