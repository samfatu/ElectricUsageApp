import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import uuid from 'react-native-uuid';
import DeviceForm from '../components/DeviceForm';
import DeviceItem from '../components/DeviceItem';
import { deviceList } from '../mockData';
import { Device, TotalAmount } from '../types';

const Calculate = () => {
  const [editModalOpened, setEditModalOpened] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const showModal = () => setEditModalOpened(true);
  const hideModal = () => setEditModalOpened(false);

  const handleClickDevice = (index: number) => {
    setSelectedDevice(deviceList[index]);
    showModal();
  }

  const handleAddDevice = () => {
    let device = new Device(uuid.v4().toString(), "", "", 0, 1, 0, 0, new TotalAmount(0, 0, 0, 0));
    setSelectedDevice(device);
    showModal();
  }

  return (
    <View style={styles.container}>
        <Portal>
          <Modal visible={editModalOpened} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
            <KeyboardAvoidingView behavior='height' enabled>
              {selectedDevice && <DeviceForm device={selectedDevice} handleClose={hideModal} />}
            </KeyboardAvoidingView>
          </Modal>
        </Portal>
      <View style={styles.listContainer}>
        <FlatList
          data={deviceList}
          renderItem={(device) =>
            <Pressable onPress={() => handleClickDevice(device.index)}>
              <DeviceItem device={device.item} />
            </Pressable>}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.reportBoxContainer}>
        <View style={styles.reportBox}>
          <Text>Total for month:</Text>
          <Text><Text style={{ color: 'red' }}>10 kW</Text>{"\t\t"}<Text style={{ color: 'red' }}>34.12 TL</Text></Text>
          <Text>Total for year:</Text>
          <Text><Text style={{ color: 'red' }}>120 kW</Text>{"\t\t"}<Text style={{ color: 'red' }}>395.8 TL</Text></Text>
        </View>
        <View>
          <Button mode="contained" icon="plus" onPress={handleAddDevice}>Add Device</Button>
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
  modalContainer: {
    backgroundColor: 'white',
    //height: hp(75),
    margin: wp(4),
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
  },
  listContainer: {
    width: wp(100),
    height: hp(78),
    paddingHorizontal: wp(4),
    paddingTop: hp(1)
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
})