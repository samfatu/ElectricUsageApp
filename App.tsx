import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PreferencesProvider } from './src/context/PreferencesContext';
import StackNav from './src/screens/nav/StackNav';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#63d471',
    secondary: '#4D9DE0',
    tertiary: '#a1b2c3'
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <PreferencesProvider>
          <NavigationContainer>
              <StackNav />
          </NavigationContainer>
        </PreferencesProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;