import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { PreferencesContext } from '../context/PreferencesContext';

const Settings = () => {
  const {lang, currency, price} = useContext(PreferencesContext);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text>Select your language</Text>
        <Pressable style={styles.pickerContainer}>
          <Text>{lang}</Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text>Select your currency</Text>
        <Pressable style={styles.pickerContainer}>
          <Text>{currency}</Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text>Enter price per kWh in your country</Text>
        <View style={{...styles.pickerContainer, height: 'auto', padding: 0 }}>
          <TextInput defaultValue={price.toString()} style={styles.priceInput} />
        </View>
      </View>
      <Button mode='contained'>Save Preferences</Button>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(90),
    display: 'flex',
    alignItems: 'center',
    paddingVertical: hp(2),
    backgroundColor: 'cyan',
  },
  section: {
    width: wp(80),
    marginBottom: hp(2),
    // borderColor: 'red',
    // borderWidth: 1
  },
  pickerContainer: {
    width: '100%',
    padding: wp(2),
    marginTop: hp(0.5),
    backgroundColor: '#e0e0e0',
    borderRadius: wp(2),
    alignSelf: 'center',
    elevation: 5,
    height: 40
  },
  priceInput: {
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: wp(2),
  }
})