import Toast from "react-native-root-toast";

namespace Ui {
  export const color = {
    background: '#eeeeee',
    main: '#00ab69',
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
      position: Toast.positions.BOTTOM - dimension.menuBar.height,
    });
  }
}

export default Ui;
