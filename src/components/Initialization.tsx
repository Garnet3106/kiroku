import { StyleSheet, Text, View } from 'react-native';
import RouteElement from './RouteElement';
import { NavigationRoutePath } from '../navigation';

export default function Initialization() {
  return (
    <RouteElement
      path={NavigationRoutePath.Initialization}
      style={styles.container}
    >
      <Text>kiroku</Text>
    </RouteElement>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
