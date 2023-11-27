import Ui from '../../ui';
import ContentArea from '../ContentArea';
import RectangleButton, { RectangleButtonProps } from './RectangleButton';

export type RectangleButtonListProps = Ui.LayoutProps & {
  buttons: RectangleButtonProps[],
};

export default function RectangleButtonList(props: RectangleButtonListProps) {
  const buttons = props.buttons.map((eachButton, index) => (
    <RectangleButton
      color={Ui.color.black}
      pressedColor={Ui.color.pressed.mainOnWhite}
      whiteBackground
      {...eachButton}
      style={[
        {
          borderBottomWidth: index + 1 === props.buttons.length ? 0 : Ui.dimension.border.width,
          borderColor: Ui.color.border.lightGray,
          borderRadius: 0,
          borderWidth: 0,
          justifyContent: 'flex-start',
        },
        eachButton.style,
      ]}
      textStyle={[
        { fontWeight: 'normal' },
        eachButton.textStyle,
      ]}
      key={Math.random()}
    />
  ));

  return (
    <ContentArea
      insertBottomMargin={props.insertBottomMargin}
      style={{ padding: 0 }}
    >
      {buttons}
    </ContentArea>
  );
}
