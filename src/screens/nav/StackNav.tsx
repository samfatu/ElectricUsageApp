import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Header from '../../components/Header';
import { StackParamList } from '../../types';
import Calculate from '../Calculate';
import Home from '../Home';
import Information from '../Information';
import Settings from '../Settings';

const Stack = createNativeStackNavigator<StackParamList>();

const StackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Calculate" component={Calculate} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Information" component={Information} />
    </Stack.Navigator>
  )
}

export default StackNav