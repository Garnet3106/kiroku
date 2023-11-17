import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ui from '../../ui';

export type NamedProps = Ui.LayoutProps & {
  title: string,
  required?: boolean,
  children: ReactNode,
};

export default function Named(props: NamedProps) {
  const title = props.required ? props.title + ' *' : props.title;

  return (
    <View style={[
      { marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined },
      styles.container,
    ]}>
      <Text style={styles.title}>
        {title}
      </Text>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
  },
  title: {
    fontSize: 16,
    marginBottom: 6,
  },
});
