import { StyleSheet, Text, View } from 'react-native';
import RouteContainer from './RouteContainer';
import { NavigationRoutePath } from '../navigation';
import Ui from '../ui';

export default function Initialization() {
  return (
    <RouteContainer
      path={NavigationRoutePath.Initialization}
      backgroundColor={Ui.color.white}
      headerDisabled
      style={styles.container}
    >
      <Text>content</Text>
    </RouteContainer>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
