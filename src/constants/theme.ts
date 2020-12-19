import { DefaultTheme } from 'react-native-paper';

const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#E91E63',
      accent: '#03A9F4',
    },
  };
// TODO implement a dark theme as well
// See: https://github.com/jvidalv/astrale/blob/master/src/constants/themes.js

export default lightTheme;