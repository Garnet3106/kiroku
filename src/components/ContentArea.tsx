import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Ui from '../ui';

export type ContentAreaProps = {
  insertBottomMargin?: boolean,
  children?: ReactNode,
};

export default function ContentArea(props: ContentAreaProps) {
  return (
    <View style={[
      { marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined },
      styles.container,
    ]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Ui.color.white,
    borderColor: Ui.color.border.lightGray,
    borderRadius: Ui.dimension.border.radius,
    borderWidth: Ui.dimension.border.width,
    padding: Ui.dimension.margin,
  },
});
