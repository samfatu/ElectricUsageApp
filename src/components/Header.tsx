import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { Appbar } from 'react-native-paper';

const Header = (props: NativeStackHeaderProps) => {
  const { navigation, back } = props;

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Electric Usage" style={{ alignItems: 'center' }} />
    </Appbar.Header>
  )
}

export default Header