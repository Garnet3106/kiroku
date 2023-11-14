import { StyleProp, StyleSheet, ViewStyle, View } from 'react-native';
import { InitializationPageIndex } from '../../../navigation';
import { ReactNode } from 'react';
import Redux from '../../../redux/redux';
import { useSelector } from 'react-redux';
import Ui from '../../../ui';

export type InitializationPageProps = {
  pageIndex: InitializationPageIndex,
  style?: StyleProp<ViewStyle>,
  children: ReactNode,
};

export default function InitializationPage(props: InitializationPageProps) {
  const navigation = useSelector((state: Redux.RootState) => state.navigation);
  const pageIndex = navigation.params && navigation.params.pageIndex;
  const displayed = pageIndex === props.pageIndex;

  return (
    <View style={[
      styles.container,
      props.style,
      { display: displayed ? undefined : 'none' },
    ]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: Ui.dimension.margin * 2,
  },
});
