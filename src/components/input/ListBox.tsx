import { GestureResponderEvent, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ui from '../../ui';
import PressableHighlight from '../pressable/PressableHighlight';

export type ListBoxOption = {
  uniqueId: string | number,
  text: string,
};

export type ListBoxProps = {
  visible: boolean,
  options: ListBoxOption[],
  onPress?: (event: GestureResponderEvent) => void,
  onSelect?: (uniqueId: string | number) => void,
};

export default function ListBox(props: ListBoxProps) {
  const optionItems = props.options.map((eachOption) => (
    <PressableHighlight
      underlayColor={{
        from: Ui.color.white,
        to: Ui.color.pressed.mainOnWhite,
      }}
      style={styles.item}
      onPress={(event) => {
        props.onPress && props.onPress(event);
        props.onSelect && props.onSelect(eachOption.uniqueId);
      }}
      key={eachOption.uniqueId}
    >
      <Text style={styles.itemText}>
        {eachOption.text}
      </Text>
    </PressableHighlight>
  ));

  return (
    <Modal transparent visible={props.visible}>
      <Pressable
        style={styles.background}
        onPress={(event) => props.onPress && props.onPress(event)}
      >
        <View style={styles.container}>
          <ScrollView style={styles.options}>
            {optionItems}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    backgroundColor: Ui.color.transparentBackground,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: Ui.dimension.margin * 2,
    width: '100%',
  },
  container: {
    maxHeight: '60%',
    width: '100%',
  },
  options: {
    backgroundColor: Ui.color.white,
    borderColor: Ui.color.border.lightGray,
    borderRadius: Ui.dimension.border.radius,
    borderWidth: Ui.dimension.border.width,
    overflow: 'hidden',
  },
  item: {
    borderRadius: Ui.dimension.border.radius,
    padding: Ui.dimension.margin,
  },
  itemText: {
    fontSize: 16,
  },
});
