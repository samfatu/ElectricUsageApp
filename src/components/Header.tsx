import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { Appbar } from 'react-native-paper';
import useLocales from '../hooks/useLocales';

const Header = (props: NativeStackHeaderProps) => {
  const { navigation, back } = props;
  const { translate } = useLocales();

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        title={translate('app-title')}
        style={{ marginLeft: 0, position: 'absolute', left: 0, right: 0 }}
        titleStyle={{ alignSelf: 'center' }}
      />
    </Appbar.Header>
  )
}

export default Header