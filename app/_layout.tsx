import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';
import Ui from '../src/ui';
import Redux from '../src/redux/redux';
import { Slot } from 'expo-router';
import MenuBar from '../src/components/MenuBar/MenuBar';

export default function () {
  return (
    <Provider store={Redux.store}>
      <StatusBar style='dark' backgroundColor={Ui.color.white} />
      <SafeAreaProvider>
        {/* Specify flexGrow not to prevent scroll in ScrollView. */}
        <SafeAreaView style={{ flexGrow: 1 }}>
          <RootSiblingParent>
            <Slot />
            <MenuBar />
          </RootSiblingParent>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
