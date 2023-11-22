import { StyleSheet, Text, View } from 'react-native';
import PressableHighlight from '../pressable/PressableHighlight';
import Ui from '../../ui';

export type ButtonRowOptionId = string | number;

export type ButtonRowOption = {
  uniqueId: ButtonRowOptionId,
  text: string,
};

export type ButtonRowProps = Ui.LayoutProps & {
  options: ButtonRowOption[],
  selected?: ButtonRowOptionId | ButtonRowOptionId[],
  onChange?: (uniqueId?: ButtonRowOptionId | ButtonRowOptionId[]) => void,
};

export default function ButtonRow(props: ButtonRowProps) {
  const options = props.options.map((eachItem) => {
    const selected = isSelected(eachItem.uniqueId);

    return (
      <PressableHighlight
        underlayColor={{
          from: selected ? Ui.color.main : Ui.color.white,
          to: selected ? Ui.color.pressed.main : Ui.color.pressed.mainOnWhite,
        }}
        style={styles.item}
        onPress={() => props.onChange && props.onChange(changeSelected(eachItem.uniqueId))}
        key={eachItem.uniqueId}
      >
        <Text style={[
          styles.itemText,
          {
            color: selected ? Ui.color.white : Ui.color.main,
            fontWeight: selected ? 'bold' : undefined,
          },
        ]}>
          {eachItem.text}
        </Text>
      </PressableHighlight>
    );
  });

  const marginBottom = props.options.length === 0 ? 0 : -Ui.dimension.margin / 2;

  return (
    <View style={[
      styles.container,
      { marginBottom: marginBottom + (props.insertBottomMargin ? Ui.dimension.margin : 0) },
    ]}>
      {options}
    </View>
  );

  function isSelected(uniqueId: ButtonRowOptionId): boolean {
    return Array.isArray(props.selected) ? props.selected.includes(uniqueId) : uniqueId === props.selected;
  }

  function changeSelected(lastSelected: ButtonRowOptionId): ButtonRowOptionId | ButtonRowOptionId[] | undefined {
    if (isSelected(lastSelected)) {
      return Array.isArray(props.selected) ? props.selected.filter((id) => id !== lastSelected) : undefined;
    } else {
      return Array.isArray(props.selected) ? [...props.selected, lastSelected] : lastSelected;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    borderColor: Ui.color.main,
    borderRadius: 100,
    borderWidth: Ui.dimension.border.width,
    marginBottom: Ui.dimension.margin / 2,
    marginRight: Ui.dimension.margin / 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  itemText: {
    fontSize: 16,
  },
});
