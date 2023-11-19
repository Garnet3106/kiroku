import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Ui from '../../../ui';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ContentArea from '../../ContentArea';
import Redux from '../../../redux/redux';
import { navigationActions } from '../../../redux/slices/navigation';
import { NavigationRoutePath } from '../../../navigation';
import Dialog from 'react-native-dialog';
import { useState } from 'react';

export type TaskItemProps = Ui.LayoutProps & {
  style?: StyleProp<ViewStyle>,
};

export default function TaskItem(props: TaskItemProps) {
  const [startDialogVisibility, setStartDialogVisibility] = useState(false);

  return (
    <>
    <ContentArea
      style={[
        styles.container,
        { marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined },
        props.style,
      ]}
      onPress={() => setStartDialogVisibility(true)}
    >
      <View style={styles.block}>
        <Entypo name='book' color={Ui.color.black} size={20} top={2} style={{ marginRight: 3 }} />
        <Text style={styles.title}>
          作業タイトル
        </Text>
      </View>
      <View style={styles.block}>
        <MaterialIcons name='access-time' color={Ui.color.gray} size={20} top={1} />
        <Text style={styles.status}>
          残り20分
        </Text>
        <Entypo name='chevron-right' color={Ui.color.gray} size={30} top={1} />
      </View>
    </ContentArea>
    <Dialog.Container visible={startDialogVisibility}>
      <Dialog.Title>
        作業開始
      </Dialog.Title>
      <Dialog.Description>
        作業「（作業タイトル）」を開始しますか？
      </Dialog.Description>
      <Dialog.Button label="キャンセル" onPress={() => setStartDialogVisibility(false)} />
      <Dialog.Button label="開始" onPress={() => {
        setStartDialogVisibility(false);
        start();
      }} />
    </Dialog.Container>
    </>
  );

  function start() {
    Ui.showToast('作業を開始しました。');
    Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.TaskInProgress));
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  block: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
  },
  status: {
    color: Ui.color.gray,
    marginLeft: 1,
    marginRight: 4,
  },
});
