import { StyleProp } from 'react-native';

namespace Ui {
  export const color = {
    background: '#eeeeee',
    main: '#02c94b',
    white: '#ffffff',
    black: '#333333',
    border: {
      lightGray: '#cccccc',
    },
  };

  export const dimension = {
    margin: 10,
    border: {
      radius: 6,
      width: 1,
    },
    menuBar: {
      height: 70,
    },
  };

  export function joinStyles<T>(start: T, original: StyleProp<T>): StyleProp<T> {
    if (!start) {
      return original;
    } else if (Array.isArray(start)) {
      const array: StyleProp<T> = [original];
      return array.concat(start);
    } else {
      return [original, start];
    }
  }
}

export default Ui;
