import { StyleSheet, Text, View } from "react-native";
import Ui from "../../ui";

export default function MenuBar() {
  return (
    <View style={styles.container}>
      <Text>MenuBar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Ui.color.white,
    borderTopColor: Ui.color.border.gray,
    borderTopWidth: 1,
    height: Ui.dimension.menuBar.height,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
  },
});
