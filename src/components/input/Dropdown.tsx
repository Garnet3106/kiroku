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
  items: DropdownItem[],
  selected?: string | number,
  insertBottomMargin?: boolean,
  onChange?: (uniqueId: string | number) => void,
  style?: StyleProp<ViewStyle>,
};

// todo: fix position on overflow
export default function Dropdown(props: DropdownProps) {
  const selected = props.items.find((eachItem) => eachItem.uniqueId === props.selected);
  const disabled = !selected;
  const text = !disabled && selected ? selected.text : '―';
  const [open, setOpen] = useState(false);

  let choices;

  if (open && props.items) {
    const items = props.items.map((eachItem) => (
      <PressableHighlight
        underlayColor={{
          from: Ui.color.white,
          to: Ui.color.background,
        }}
        style={styles.choiceItem}
        onPress={() => {
          setOpen(false);
          props.onChange && props.onChange(eachItem.uniqueId);
        }}
        key={eachItem.uniqueId}
      >
        <Text style={styles.choiceItemText}>
          {eachItem.text}
        </Text>
      </PressableHighlight>
    ));

    choices = (
      <View style={styles.choices}>
        {items}
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
      {choices}
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
  choices: {
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
  choiceItem: {
    padding: Ui.dimension.margin,
  },
  choiceItemText: {
    fontSize: 16,
  },
});
