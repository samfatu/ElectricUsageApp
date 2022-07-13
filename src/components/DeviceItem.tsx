import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Device } from '../types';

interface DeviceItemProps {
  device: Device;
}

const DeviceItem = (props: DeviceItemProps) => {
  const { device } = props;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Avatar.Icon icon={device.iconName} size={wp(12)}/>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.summaryContainer}>
          <Text style={styles.deviceNameText}>{device.name}</Text>
          <Text style={styles.deviceDetailsText}>{device.count} piece</Text>
          <Text style={styles.deviceDetailsText}>{device.watt} W</Text>
          <Text style={styles.deviceDetailsText}>Edit</Text>
          {/* <Avatar.Icon icon="pencil" size={wp(4)}/> */}
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
          <View style={styles.box}>
            <Text style={styles.amountsTimeText}>Day</Text>
            <Text style={styles.amountsText}>{device.amounts.day}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.amountsTimeText}>Week</Text>
            <Text style={styles.amountsText}>{device.amounts.week}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.amountsTimeText}>Month</Text>
            <Text style={styles.amountsText}>{device.amounts.month}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.amountsTimeText}>Year</Text>
            <Text style={styles.amountsText}>{device.amounts.year}</Text>
          </View>
        </View>
      </View>

      {/* <View style={styles.amountsContainer}>
        <View style={styles.amountsFirstSection}>
          <Text>d:{`\t${device.amounts.day}`}</Text>
          <Text>w:{`\t${device.amounts.day}`}</Text>
        </View>
        <View style={styles.amountsSecondSection}>
          <Text>m:{`\t${device.amounts.day}`}</Text>
          <Text>y:{`\t${device.amounts.day}`}</Text>
        </View>
      </View> */}
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
    //width: '100%'
    flex: 1
  },
  box: {
    alignItems: 'center'
  },
  amountsTimeText: {
    fontSize: 12,
    borderBottomWidth: 0.5,
  },
  amountsText: {

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
  },
  deviceDetailsText: {
    fontSize: 12
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