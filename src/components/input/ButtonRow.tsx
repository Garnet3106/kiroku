import { StyleSheet, Text, View } from 'react-native';
import PressableHighlight from '../pressable/PressableHighlight';
import Ui from '../../ui';

export type ButtonRowOption = {
  uniqueId: string | number,
  text: string,
};

export type ButtonRowProps = Ui.LayoutProps & {
  options: ButtonRowOption[],
  selected?: string | number,
  onChange?: (uniqueId: string | number) => void,
};

export default function ButtonRow(props: ButtonRowProps) {

  const options = props.options.map((eachItem) => {
    const selected = eachItem.uniqueId === props.selected;

    return (
      <PressableHighlight
        underlayColor={{
          from: selected ? Ui.color.main : Ui.color.white,
          to: selected ? Ui.color.pressed.main : Ui.color.pressed.mainOnWhite,
        }}
        style={styles.item}
        onPress={() => props.onChange && props.onChange(eachItem.uniqueId)}
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
