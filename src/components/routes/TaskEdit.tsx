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
import { t } from '../../translations';

export default function TaskEdit() {
  const categoryOptions = TaskCategory.enumerate().map((v) => ({
    uniqueId: v,
    text: t(`task.categories.${v}`),
  }));

  const [category, setCategory] = useState(TaskCategory.Uncategorized);

  const [deleteDialogVisibility, setDeleteDialogVisibility] = useState(false);

  return (
    <RouteContainer path={NavigationRoutePath.TaskEdit} title='作業登録/編集' /* fix title */>
      <ContentArea>
        <Text style={styles.message}>
          {t('taskEdit.whatKindOfTask')}
        </Text>
        <Named title={t('taskEdit.category')} required insertBottomMargin>
          <Dropdown options={categoryOptions} selected={category} onChange={(v) => setCategory(v as number)} />
        </Named>
        <Named title={t('taskEdit.title')} required insertBottomMargin>
          <TextInput placeholder={t('taskEdit.titleExample')} />
        </Named>
        <Named title={t('taskEdit.intervalOfWorkingDate')} required insertBottomMargin>
          <TextInput placeholder='要修正' />
        </Named>
        <ContentSeparator insertBottomMargin />
        <RectangleButton
          text={t('taskEdit.delete')}
          color={Ui.color.red}
          pressedColor={Ui.color.pressed.redOnWhite}
          whiteBackground
          insertBottomMargin
          onPress={() => setDeleteDialogVisibility(true)}
        />
        <RectangleButton text={t('taskEdit.save')} onPress={onPressSaveButton} />
      </ContentArea>
      <Dialog.Container visible={deleteDialogVisibility}>
        <Dialog.Title>
          {t('taskEdit.dialog.taskMgmt')}
        </Dialog.Title>
        <Dialog.Description>
          {t('taskEdit.dialog.doYouReallyDeleteTask', { taskTitle: '作業タイトル' })}
        </Dialog.Description>
        <Dialog.Button label={t('taskEdit.dialog.cancel')} onPress={() => setDeleteDialogVisibility(false)} />
        <Dialog.Button label={t('taskEdit.dialog.delete')} onPress={() => {
          setDeleteDialogVisibility(false);
          deleteTask();
        }} />
      </Dialog.Container>
    </RouteContainer>
  );

  function deleteTask() {
    Ui.showToast(t('taskEdit.toast.taskWasDeleted'));
    Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Management));
  }

  function onPressSaveButton() {
    Ui.showToast(t('taskEdit.toast.taskWasSaved'));
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
