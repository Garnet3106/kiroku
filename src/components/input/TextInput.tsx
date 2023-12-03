import { StyleSheet, TextInput as RNTextInput, TextInputProps as RNTextInputProps, View } from 'react-native';
import Ui from '../../ui';

export default function TextInput(props: Ui.LayoutProps & RNTextInputProps) {
  return (
    <View style={[
      styles.container,
      { marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined },
    ]}>
      <RNTextInput
        cursorColor={Ui.color.black}
        {...props}
        style={[styles.text, props.style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: Ui.color.main,
    borderRadius: Ui.dimension.border.radius,
    borderWidth: Ui.dimension.border.width,
    padding: 10,
    width: '100%',
  },
  text: {
    fontSize: 18,
  },
});
