import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import Ui from '../../ui';
import { Entypo } from '@expo/vector-icons';
import PressableHighlight from '../pressable/PressableHighlight';
import { useState } from 'react';
import ListBox, { ListBoxOption } from './ListBox';

export type DropdownProps = Ui.LayoutProps & {
  options: ListBoxOption[],
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
  const [listBoxVisibility, setListBoxVisibility] = useState(false);

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
        onPress={() => setListBoxVisibility(true)}
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
      <ListBox
        visible={listBoxVisibility}
        options={props.options}
        onPress={() => setListBoxVisibility(false)}
        onSelect={(uniqueId) => props.onChange && props.onChange(uniqueId)}
      />
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
});
