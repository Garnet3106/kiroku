import { Modal, Pressable, ScrollView, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import Ui from '../../ui';
import { Entypo } from '@expo/vector-icons';
import PressableHighlight from '../pressable/PressableHighlight';
import { useState } from 'react';

export type DropdownOptions = {
  uniqueId: string | number,
  text: string,
};

export type DropdownProps = Ui.LayoutProps & {
  options: DropdownOptions[],
  selected?: string | number,
  onChange?: (uniqueId: string | number) => void,
  containerStyle?: StyleProp<ViewStyle>,
  style?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
};

// todo: adjust position on overflow
export default function Dropdown(props: DropdownProps) {
  const selected = props.options.find((eachOption) => eachOption.uniqueId === props.selected);
  const disabled = !selected;
  const text = !disabled && selected ? selected.text : '―';
  const [open, setOpen] = useState(false);

  let options;

  if (open && props.options) {
    const optionItems = props.options.map((eachOption) => (
      <PressableHighlight
        underlayColor={{
          from: Ui.color.white,
          to: Ui.color.pressed.mainOnWhite,
        }}
        style={styles.optionItem}
        onPress={() => {
          setOpen(false);
          props.onChange && props.onChange(eachOption.uniqueId);
        }}
        key={eachOption.uniqueId}
      >
        <Text style={styles.optionItemText}>
          {eachOption.text}
        </Text>
      </PressableHighlight>
    ));

    options = (
      <Modal transparent>
        <Pressable style={styles.optionsBackground} onPress={() => setOpen(false)}>
          <View style={styles.optionsContainer}>
            <ScrollView style={styles.options}>
              {optionItems}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    );
  }

  return (
    <View style={props.containerStyle}>
      <PressableHighlight
        underlayColor={{
          from: disabled ? Ui.color.lightGray : Ui.color.white,
          to: disabled ? Ui.color.lightGray : Ui.color.pressed.mainOnWhite,
        }}
        style={[
          {
            borderColor: disabled ? Ui.color.gray : Ui.color.main,
            marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined,
          },
          styles.textArea,
          props.style,
        ]}
        onPress={() => setOpen((state) => !state)}
      >
        <Text style={[
          { color: disabled ? Ui.color.gray : Ui.color.black },
          props.textStyle,
          styles.text,
        ]}>
          {text}
        </Text>
        <Entypo name='chevron-down' style={styles.icon} color={Ui.color.gray} size={30}/>
      </PressableHighlight>
      {options}
    </View>
  );
}

const styles = StyleSheet.create({
  textArea: {
    alignItems: 'center',
    borderRadius: Ui.dimension.border.radius,
    borderWidth: Ui.dimension.border.width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  text: {
    fontSize: 18,
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: Ui.dimension.margin,
  },
  optionsBackground: {
    alignItems: 'center',
    backgroundColor: Ui.color.transparentBackground,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: Ui.dimension.margin * 2,
    width: '100%',
  },
  optionsContainer: {
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
  optionItem: {
    borderRadius: Ui.dimension.border.radius,
    padding: Ui.dimension.margin,
  },
  optionItemText: {
    fontSize: 16,
  },
});
