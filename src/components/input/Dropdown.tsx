import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Ui from '../../ui';
import Entypo from '@expo/vector-icons/Entypo';
import PressableHighlight from '../pressable/PressableHighlight';
import { useState } from 'react';

export type DropdownItem = {
  uniqueId: string | number,
  text: string,
};

export type DropdownProps = {
  options: DropdownItem[],
  selected?: string | number,
  insertBottomMargin?: boolean,
  onChange?: (uniqueId: string | number) => void,
  style?: StyleProp<ViewStyle>,
};

// todo: fix position on overflow
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
          to: Ui.color.background,
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
      <View style={styles.options}>
        {optionItems}
      </View>
    );
  }

  return (
    <View>
      <PressableHighlight
        underlayColor={{
          from: disabled ? Ui.color.lightGray : Ui.color.white,
          to: disabled ? Ui.color.lightGray : Ui.color.background,
        }}
        style={[
          {
            borderColor: disabled ? Ui.color.gray : Ui.color.main,
            marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined,
          },
          styles.textArea,
        ]}
        onPress={() => setOpen((state) => !state)}
      >
        <Text style={[
          styles.text,
          { color: disabled ? Ui.color.gray : Ui.color.black },
          props.style,
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
    padding: 12,
    width: '100%',
  },
  text: {
    fontSize: 18,
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: Ui.dimension.margin,
  },
  options: {
    backgroundColor: Ui.color.white,
    borderColor: Ui.color.border.lightGray,
    borderRadius: Ui.dimension.border.radius,
    borderWidth: Ui.dimension.border.width,
    overflow: 'hidden',
    position: 'absolute',
    top: 55,
    width: '100%',
    zIndex: 10000,
  },
  optionItem: {
    padding: Ui.dimension.margin,
  },
  optionItemText: {
    fontSize: 16,
  },
});
