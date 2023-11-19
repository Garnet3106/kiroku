import Toast from 'react-native-root-toast';

namespace Ui {
  export type LayoutProps = {
    insertBottomMargin?: boolean,
  };

  export const color = {
    background: '#eeeeee',
    main: '#00ab69',
    lightMain: '#a9e8c4',
    white: '#ffffff',
    black: '#333333',
    gray: '#999999',
    lightGray: '#dddddd',
    red: '#eb2626',
    border: {
      lightGray: '#dddddd',
    },
    pressed: {
      main: '#3db56f',
      mainOnWhite: '#edf5f1',
      red: '#fc3d3d',
      redOnWhite: '#ffebeb',
    },
  };

  export const dimension = {
    margin: 10,
    border: {
      radius: 6,
      width: 1,
    },
    header: {
      height: 40,
    },
    menuBar: {
      height: 70,
    },
  };

  export function showToast(message: string) {
    Toast.show(message, {
      backgroundColor: color.main,
      duration: Toast.durations.SHORT,
      opacity: 1,
      position: Toast.positions.BOTTOM - dimension.menuBar.height,
    });
  }
}

export default Ui;
