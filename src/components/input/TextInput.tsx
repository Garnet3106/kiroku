import { StyleSheet, TextInput as RNTextInput, TextInputProps as RNTextInputProps, TextStyle, View } from 'react-native';
import Ui from '../../ui';

export default function TextInput(props: RNTextInputProps) {
  return (
    <View style={styles.container}>
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
    padding: 12,
    width: '100%',
  },
  text: {
    fontSize: 18,
  },
});
