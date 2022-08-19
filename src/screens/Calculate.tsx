import React, { useContext, useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { FAB, Modal, Portal } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import uuid from 'react-native-uuid';
import DeviceForm from '../components/DeviceForm';
import DeviceItem from '../components/DeviceItem';
import { PreferencesContext } from '../context/PreferencesContext';
import useLocales from '../hooks/useLocales';
import { Device, DeviceListCalculateResult, TotalAmount } from '../types';
import { calculateTotal } from '../utils/calculator';
import { printPrice } from '../utils/printPrice';

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
  const { currencySymbol, currencyLeft, price } = useContext(PreferencesContext);
  const { translate } = useLocales();

  useEffect(() => {
    let storedDevices = devicesStorage.getString('devices');

    if (storedDevices) {
      setDevices(JSON.parse(storedDevices));
    } else {
      devicesStorage.set('devices', JSON.stringify(devices));
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
            {selectedDevice && <DeviceForm device={selectedDevice} handleClose={hideModal} mode={modalMode} price={price} index={editIndex} />}
          </KeyboardAvoidingView>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleAddDevice}
      />
      <View style={styles.reportBoxContainer}>
          {deviceListTotal && (
            <View style={styles.reportBox}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text>{translate('monthly-total')}</Text>
                  <Text>
                    {"\t"}
                    <Text style={styles.reportResultText}>{deviceListTotal.totalKWMonth} kW, </Text>
                    <Text style={styles.reportResultText}>{printPrice(deviceListTotal.totalAmountMonth, currencySymbol, currencyLeft)}</Text>
                  </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text>{translate('annual-total')}</Text>
                  <Text>
                    {"\t"}
                    <Text style={styles.reportResultText}>{deviceListTotal.totalKWYear} kW, </Text>
                    <Text style={styles.reportResultText}>{printPrice(deviceListTotal.totalAmountYear, currencySymbol, currencyLeft)}</Text>
                  </Text>
                </View>
            </View>
          )}
      </View>
      <View style={styles.listContainer}>
        {devices.length > 0 ? (
          <FlatList
            data={devices}
            renderItem={(device) =>
              <Pressable onPress={() => handleClickDevice(device.index)}>
                <DeviceItem device={device.item} />
              </Pressable>}
            showsVerticalScrollIndicator={false}
          />
        ) :
        <Text>{translate('no-device')}</Text>}
      </View>
    </View>
  )
}

export default Calculate

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: '100%',
    display: 'flex',
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: wp(4),
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
  },
  listContainer: {
    width: '100%',
    marginBottom: hp(6),
    paddingHorizontal: wp(4),
    paddingTop: hp(1)
  },
  reportBoxContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e0e0e0',
  },
  reportBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  reportResultText: {
    color: '#D33F49'
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#63d471',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 10001
  }
})