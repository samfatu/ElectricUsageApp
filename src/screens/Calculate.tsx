import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import DeviceItem from '../components/DeviceItem'
import { deviceList } from '../mockData'

const Calculate = () => {
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={deviceList}
          renderItem={(device) => <DeviceItem device={device.item} />}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}><Text>*</Text>Click on an item to edit its numbers</Text>
      </View>
      <View style={styles.reportBoxContainer}>
        <View style={styles.reportBox}>
          <Text>Total for month:</Text>
          <Text><Text style={{ color: 'red' }}>10 kW</Text>{"\t\t"}<Text style={{ color: 'red' }}>34.12 TL</Text></Text>
          <Text>Total for year:</Text>
          <Text><Text style={{ color: 'red' }}>120 kW</Text>{"\t\t"}<Text style={{ color: 'red' }}>395.8 TL</Text></Text>
        </View>
        <View>
          <Button style={styles.addDeviceButton} mode="contained" icon="plus">Add Device</Button>
        </View>
      </View>
    </View>
  )
}

export default Calculate

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(90),
  },
  listContainer: {
    width: wp(100),
    height: hp(76),
    paddingHorizontal: wp(4),
    paddingTop: hp(1)
  },
  list: {
    //backgroundColor: 'cyan'
  },
  infoBox: {
    width: wp(100),
    height: hp(2),
    paddingHorizontal: wp(4),
  },
  infoText: {
    fontSize: 12
  },
  reportBoxContainer: {
    width: wp(100),
    height: hp(12),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#e0e0e0',
  },
  reportBox: {

  },
  addDeviceButton: {
    //flex: 1,
    //display: 'flex',
    //alignSelf: 'center',
    //position: 'absolute',
    //bottom: hp(2)
  }
})