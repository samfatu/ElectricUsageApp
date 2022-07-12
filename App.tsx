import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNav from './src/screens/nav/StackNav';

const App = () => {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
};

export default App;