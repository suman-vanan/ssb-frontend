import 'react-native-gesture-handler';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import RootNavigator from './src/navigation/RootNavigator';
import lightTheme from './src/constants/theme';

const App = () => {
  return (
    <PaperProvider theme={lightTheme}>
      <RootNavigator />
    </PaperProvider>
  );
};

export default App;
