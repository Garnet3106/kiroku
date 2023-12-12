import Toast from 'react-native-root-toast';

namespace Ui {
  export type LayoutProps = {
    insertBottomMargin?: boolean,
  };

  export const color = {
    background: '#eeeeee',
    transparentBackground: '#55555533',
    main: '#00ab69',
    lightMain: '#a9e8c4',
    white: '#ffffff',
    black: '#333333',
    gray: '#999999',
    lightGray: '#dddddd',
    red: '#eb2626',
    orange: '#ed832d',
    border: {
      lightGray: '#dddddd',
    },
    pressed: {
      main: '#3db56f',
      mainOnWhite: '#edf5f1',
      black: '#444444',
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

  export type ToastOptions = {
    backgroundColor?: string,
    avoidMenuBar?: boolean,
    showsLong?: boolean,
  };

  export function showToast(message: string, options?: ToastOptions) {
    const bottomMargin = options?.avoidMenuBar === undefined || options?.avoidMenuBar ? dimension.menuBar.height : 0;

    Toast.show(message, {
      backgroundColor: options?.backgroundColor ?? color.main,
      duration: options?.showsLong ? Toast.durations.LONG : Toast.durations.SHORT,
      opacity: 1,
      position: Toast.positions.BOTTOM - bottomMargin,
    });
  }
}

export default Ui;
