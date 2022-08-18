import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import useLocales from '../hooks/useLocales';

const Home = (props: NativeStackHeaderProps) => {
  const { navigation } = props;
  const { translate } = useLocales();

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.welcomeText}>{translate('welcome')}</Text>
        <Text style={styles.descriptionText}>{translate('description')}</Text>
      </View>

      <Pressable onPress={() => navigation.navigate('Calculate')} >
        <View style={styles.box}>
          <View style={styles.boxContainer}>
            <Avatar.Icon icon="calculator" size={40} />
            <Text style={styles.boxTitle}>{translate('calculate-menu')}</Text>
          </View>
        </View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Settings')} >
        <View style={styles.box}>
          <View style={styles.boxContainer}>
            <Avatar.Icon icon="earth" size={40} />
            <Text style={styles.boxTitle}>{translate('preferences-menu')}</Text>
          </View>
        </View>
      </Pressable>

      {/* TODO: will be available on next version
      <Pressable onPress={() => navigation.navigate('Information')} >
        <View style={styles.box}>
          <View style={styles.boxContainer}>
            <Avatar.Icon icon="information" size={40} />
            <Text style={styles.boxTitle}>{translate('information-menu')}</Text>
          </View>
        </View>
      </Pressable> */}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(90),
    display: 'flex',
    alignItems: 'center',
    paddingTop: hp(5)
  },
  box: {
    width: wp(90),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2.5),
    backgroundColor: '#e0e0e0',
    borderRadius: wp(2),
    elevation: 10,
    marginBottom: hp(5)
  },
  boxContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  descriptionText: {
    textAlign: 'center',
    color: '#707070',
    marginTop: hp(1)
  },
  boxTitle: {
    marginLeft: wp(1),
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    color: '#505050',
    fontSize: 16,
  }
})