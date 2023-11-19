import { ColorValue, StyleProp, View, ViewStyle } from 'react-native';
import Ui from '../ui';

export type ContentSeparatorProps = Ui.LayoutProps & {
  color?: ColorValue,
  style?: StyleProp<ViewStyle>,
};

export default function ContentSeparator(props: ContentSeparatorProps) {
  return (
    <View style={[
      {
        backgroundColor: props.color ?? Ui.color.gray,
        height: Ui.dimension.border.width,
        marginBottom: props.insertBottomMargin ? Ui.dimension.margin : undefined,
        width: '100%',
      },
      props.style,
    ]} />
  );
}
