import React, { useContext, useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { Button, Modal, Portal } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import uuid from 'react-native-uuid';
import DeviceForm from '../components/DeviceForm';
import DeviceItem from '../components/DeviceItem';
import { PreferencesContext } from '../context/PreferencesContext';
import { deviceList } from '../mockData';
import { Device, DeviceListCalculateResult, TotalAmount } from '../types';
import { calculateTotal } from '../utils/calculator';

export const devicesStorage = new MMKV({
  id: 'devices',
  encryptionKey: 'temp'
});

export type ModalMode = "edit" | "add";

const Calculate = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [editModalOpened, setEditModalOpened] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [editIndex, setEditIndex] = useState<number>(0);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [deviceListTotal, setDeviceListTotal] = useState<DeviceListCalculateResult | null>(null);
  const { currency, lang, price } = useContext(PreferencesContext);

  useEffect(() => {
    let storedDevices = devicesStorage.getString('devices');

    if (storedDevices) {
      console.log('StoredDevices found!');
      setDevices(JSON.parse(storedDevices));
    } else {
      // TODO: change deviceList to devices
      devicesStorage.set('devices', JSON.stringify(deviceList));
    }
  }, [editModalOpened]);

  useEffect(() => {
    let calculatedValue = calculateTotal(devices);
    setDeviceListTotal(calculatedValue);
  }, [devices]);

  const showModal = () => setEditModalOpened(true);
  const hideModal = () => setEditModalOpened(false);

  const handleClickDevice = (index: number) => {
    setModalMode("edit");
    setEditIndex(index);
    setSelectedDevice(devices[index]);
    showModal();
  }

  const handleAddDevice = () => {
    setModalMode("add");
    let device = new Device(uuid.v4().toString(), "", "alpha-d-circle", 0, 0, 0, 0, new TotalAmount(0, 0, 0, 0));
    setSelectedDevice(device);
    showModal();
  }

  return (
    <View style={styles.container}>
        <Portal>
          <Modal visible={editModalOpened} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
            <KeyboardAvoidingView behavior='height' enabled>
              {selectedDevice && <DeviceForm device={selectedDevice} handleClose={hideModal} mode={modalMode} index={editIndex} />}
            </KeyboardAvoidingView>
          </Modal>
        </Portal>
      <View style={styles.listContainer}>
        <FlatList
          data={devices}
          renderItem={(device) =>
            <Pressable onPress={() => handleClickDevice(device.index)}>
              <DeviceItem device={device.item} />
            </Pressable>}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.reportBoxContainer}>
          {deviceListTotal && (
            <View style={styles.reportBox}>
                <Text>Total for month:</Text>
                <Text>
                  <Text style={{ color: 'red' }}>{deviceListTotal.totalKWMonth} kW</Text>
                  {"\t\t"}
                  <Text style={{ color: 'red' }}>{`${currency}${deviceListTotal.totalAmountMonth}`}</Text>
                </Text>
                <Text>Total for year:</Text>
                <Text>
                  <Text style={{ color: 'red' }}>{deviceListTotal.totalKWYear} kW</Text>
                  {"\t\t"}
                  <Text style={{ color: 'red' }}>{`${currency}${deviceListTotal.totalAmountYear}`}</Text>
                </Text>
            </View>
          )}
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