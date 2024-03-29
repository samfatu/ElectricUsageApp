import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PreferencesContext } from '../context/PreferencesContext';
import useLocales from '../hooks/useLocales';
import { Device } from '../types';
import { printPrice } from '../utils/printPrice';

interface DeviceItemProps {
  device: Device;
}

const DeviceItem = (props: DeviceItemProps) => {
  const { device } = props;
  const { translate } = useLocales();
  const { currencySymbol, currencyLeft } = useContext(PreferencesContext);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Avatar.Icon icon={device.iconName} size={wp(12)}/>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.summaryContainer}>
          <Text style={styles.deviceNameText}>{device.name}</Text>
          <Text style={styles.deviceDetailsText}>{device.count} {translate('piece-l')}</Text>
          <Text style={styles.deviceDetailsText}>{device.watt} {translate('watt')}</Text>
          <Icon name='pencil' />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
          <View style={styles.box}>
            <Text style={styles.amountsTimeText}>{translate('day')}</Text>
            <Text style={styles.amountsText}>{printPrice(device.amounts.day, currencySymbol, currencyLeft)}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.amountsTimeText}>{translate('week')}</Text>
            <Text style={styles.amountsText}>{printPrice(device.amounts.week, currencySymbol, currencyLeft)}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.amountsTimeText}>{translate('month')}</Text>
            <Text style={styles.amountsText}>{printPrice(device.amounts.month, currencySymbol, currencyLeft)}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.amountsTimeText}>{translate('year')}</Text>
            <Text style={styles.amountsText}>{printPrice(device.amounts.year, currencySymbol, currencyLeft)}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default DeviceItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    borderRadius: wp(2),
    elevation: 2,
    marginBottom: hp(1),
    display: 'flex',
    flexDirection: 'row'
  },
  iconContainer: {
    padding: wp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1
  },
  box: {
    alignItems: 'center'
  },
  amountsTimeText: {
    fontSize: 12,
    borderBottomWidth: 0.5,
    color: '#333333'
  },
  amountsText: {
    color: '#333333'
  },
  summaryContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp(1)
  },
  deviceNameText: {
    fontWeight: 'bold',
    color: '#333333'
  },
  deviceDetailsText: {
    fontSize: 12,
    color: '#333333'
  },
  amountsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: 'pink',
    flex: 3
  },
  amountsFirstSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  amountsSecondSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})