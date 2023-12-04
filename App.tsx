import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import Redux from './src/redux/redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppRoot from './src/components/AppRoot';
import { RootSiblingParent } from 'react-native-root-siblings';
import Ui from './src/ui';

export default function App() {
  return (
    <Provider store={Redux.store}>
      <StatusBar style='dark' backgroundColor={Ui.color.white} />
      <SafeAreaProvider>
        {/* Specify flexGrow not to prevent scroll in ScrollView. */}
        <SafeAreaView style={{ flexGrow: 1 }}>
          <RootSiblingParent>
            <AppRoot />
          </RootSiblingParent>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
