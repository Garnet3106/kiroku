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

  export const getErrorToastOptions: () => ToastOptions = () => ({
    backgroundColor: color.red,
    showsLong: true,
  });

  export function showToast(message: string, options?: ToastOptions | ToastOptions[]) {
    const mergedOptions = mergeToastOptions(options);
    const bottomMargin = mergedOptions?.avoidMenuBar === undefined || mergedOptions?.avoidMenuBar ? dimension.menuBar.height : 0;

    Toast.show(message, {
      backgroundColor: mergedOptions?.backgroundColor ?? color.main,
      duration: mergedOptions?.showsLong ? Toast.durations.LONG : Toast.durations.SHORT,
      opacity: 1,
      position: Toast.positions.BOTTOM - bottomMargin,
    });
  }

  function mergeToastOptions(options?: ToastOptions | ToastOptions[]): ToastOptions | null {
    if (!options) {
      return null;
    }

    if (!Array.isArray(options)) {
      return options;
    }

    return options.reduce((previous, current) => Object.assign(previous, current));
  }
}

export default Ui;
