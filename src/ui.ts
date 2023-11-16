import { StyleProp } from 'react-native';

namespace Ui {
  export const color = {
    background: '#eeeeee',
    main: '#00ab69',
    white: '#ffffff',
    black: '#333333',
    gray: '#999999',
    border: {
      lightGray: '#cccccc',
    },
    pressed: {
      main: '#3db56f',
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
}

export default Ui;
