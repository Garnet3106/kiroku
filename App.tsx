import { Platform, StatusBar } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import Redux from './src/redux/redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Root from './src/components/Root';

export default function App() {
  return (
    <Provider store={Redux.store}>
      <ExpoStatusBar style={Platform.OS === 'android' ? 'dark' : 'dark'} />
      <SafeAreaProvider>
        <SafeAreaView style={{
          // Specify flexGrow not to prevent scroll in ScrollView.
          flexGrow: 1,
          paddingTop: StatusBar.currentHeight ?? 0,
        }}>
          <Root />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
