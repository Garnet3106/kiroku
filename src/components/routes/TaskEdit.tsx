import { useState } from 'react';
import { NavigationRoutePath } from '../../navigation';
import RouteContainer from '../RouteContainer';
import Dropdown from '../input/Dropdown';
import Named from '../input/Named';
import { TaskCategory } from '../../task';
import ContentArea from '../ContentArea';
import TextInput from '../input/TextInput';
import RectangleButton from '../input/RectangleButton';
import Ui from '../../ui';
import Dialog from 'react-native-dialog';
import Redux from '../../redux/redux';
import { navigationActions } from '../../redux/slices/navigation';
import ContentSeparator from '../ContentSeparator';
import { StyleSheet, Text } from 'react-native';

export default function TaskEdit() {
  const categoryOptions = TaskCategory.enumerate().map((v) => ({
    uniqueId: v,
    text: TaskCategory.translate(v),
  }));

  const [category, setCategory] = useState(TaskCategory.Uncategorized);

  const [deleteDialogVisibility, setDeleteDialogVisibility] = useState(false);

  return (
    <RouteContainer path={NavigationRoutePath.TaskEdit}>
      <ContentArea>
        <Text style={styles.message}>
          どのような作業に取り組みますか？
        </Text>
        <Named title='カテゴリー' required insertBottomMargin>
          <Dropdown options={categoryOptions} selected={category} onChange={(v) => setCategory(v as number)} />
        </Named>
        <Named title='タイトル' required insertBottomMargin>
          <TextInput placeholder='例）受験勉強' />
        </Named>
        <Named title='作業間隔' required insertBottomMargin>
          <TextInput placeholder='要修正' />
        </Named>
        <ContentSeparator insertBottomMargin />
        <RectangleButton
          text='削除する'
          color={Ui.color.red}
          pressedColor={Ui.color.pressed.redOnWhite}
          whiteBackground
          insertBottomMargin
          onPress={() => setDeleteDialogVisibility(true)}
        />
        <RectangleButton text='保存する' onPress={onPressSaveButton} />
      </ContentArea>
      <Dialog.Container visible={deleteDialogVisibility}>
        <Dialog.Title>
          作業管理
        </Dialog.Title>
        <Dialog.Description>
          作業「（作業タイトル）」を削除しますか？
        </Dialog.Description>
        <Dialog.Button label="キャンセル" onPress={() => setDeleteDialogVisibility(false)} />
        <Dialog.Button label="削除" onPress={() => {
          setDeleteDialogVisibility(false);
          deleteTask();
        }} />
      </Dialog.Container>
    </RouteContainer>
  );

  function deleteTask() {
    Ui.showToast('作業を削除しました。');
    Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Management));
  }

  function onPressSaveButton() {
    Ui.showToast('作業を保存しました。');
    Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Management));
  }
}

const styles = StyleSheet.create({
  message: {
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: Ui.dimension.margin,
  },
});
