import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Ui from '../ui';

export type ContentTitleProps = Ui.LayoutProps & {
  text: string,
  style?: StyleProp<ViewStyle>,
};

export default function ContentTitle(props: ContentTitleProps) {
  return (
    <View style={[
      props.style,
      styles.container,
      { marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined },
    ]}>
      <View style={styles.bar} />
      <Text style={styles.text}>
        {props.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  bar: {
    backgroundColor: Ui.color.main,
    height: 20,
    marginRight: 4,
    width: 5,
  },
  text: {
    bottom: 1,
    color: Ui.color.main,
    fontSize: 16,
  },
});
