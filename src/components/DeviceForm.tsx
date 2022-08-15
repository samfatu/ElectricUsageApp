import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Avatar, Button, IconButton, Modal, Portal, TextInput } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { iconList } from '../constants';
import useLocales from '../hooks/useLocales';
import { devicesStorage, ModalMode } from '../screens/Calculate';
import { Device } from '../types';
import { calculateDevice } from '../utils/calculator';

interface DeviceFormProps {
  device: Device;
  handleClose: () => void;
  mode: ModalMode;
  price: number;
  index?: number;
}

const DeviceForm = (props: DeviceFormProps) => {
  const [editedDevice, setEditedDevice] = useState<Device | null>(null);
  const [helperText, setHelperText] = useState<string>("");
  const [showHelperText, setShowHelperText] = useState<boolean>(false);
  const { device, handleClose, mode, price, index } = props;
  const [iconModalOpened, setIconModalOpened] = useState<boolean>(false);
  const { translate } = useLocales();

  useEffect(() => {
    setEditedDevice(device);
  }, [props]);

  useEffect(() => {
    if (editedDevice) {
      let calculatedValues = calculateDevice(editedDevice, price);
      setEditedDevice({...editedDevice, amounts: calculatedValues});
    }
  }, [editedDevice?.count, editedDevice?.watt, editedDevice?.dailyHours, editedDevice?.weeklyDays]);

  const showModal = () => setIconModalOpened(true);
  const hideModal = () => setIconModalOpened(false);

  const handleSaveDevice = () => {
    if (validateInputs()) {
      setHelperText("");
      setShowHelperText(false);
      saveToStorage();
      handleClose();
    }
  }

  const saveToStorage = () => {
    if (devicesStorage.getString('devices') && editedDevice) {
      let deviceList : Device[] = JSON.parse(devicesStorage.getString('devices') as string);

      // To edit
      if (mode === "edit" && (index !== null && index !== undefined)) {
        deviceList[index] = editedDevice;
        devicesStorage.set('devices', JSON.stringify(deviceList));
      } else { // To create
        deviceList.push(editedDevice);
        devicesStorage.set('devices', JSON.stringify(deviceList));
      }
    }
  }

  const handleDeleteDevice = () => {
    if (devicesStorage.getString('devices')) {
      let deviceList : Device[] = JSON.parse(devicesStorage.getString('devices') as string);

      if (index !== null && index !== undefined) {
        deviceList.splice(index, 1);
        devicesStorage.set('devices', JSON.stringify(deviceList));
      }
      handleClose();
    }
  }

  const validateInputs = () => {
    if (editedDevice) {
      // TODO: check for auto focus to related field
      if (editedDevice.dailyHours > 24 || editedDevice.dailyHours < 0) {
        setHelperText(translate('daily-error'));
        setShowHelperText(true);
        return false;
      }
      if (editedDevice.weeklyDays > 7 || editedDevice.weeklyDays < 0) {
        setHelperText(translate('weekly-error'));
        setShowHelperText(true);
        return false;
      }
    }
    return true;
  }

  return (
    <ScrollView style={styles.container}>
      <Portal>
        <Modal visible={iconModalOpened} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.headerText}>{translate('choose-icon')}</Text>
          <IconButton icon="close" size={14} onPress={hideModal} />
        </View>
          <FlatList
            keyExtractor={(item) => item}
            data={iconList}
            numColumns={4}
            columnWrapperStyle={{
              flex: 1,
              justifyContent: 'space-around'
            }}
            renderItem={(item) => (
              <Pressable
                style={{ marginVertical: hp(1) }}
                onPress={() => {
                  let device = editedDevice;
                  device!.iconName = item.item;
                  setEditedDevice(device);
                  hideModal();
                }}
              >
                <Avatar.Icon icon={item.item} />
              </Pressable>
            )}
          />
        </Modal>
      </Portal>
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>{translate('edit-device')}</Text>
        <IconButton icon="close" size={14} onPress={handleClose} />
      </View>
      {editedDevice ? (
        <>
          <View style={styles.nameAndAvatarSection}>
            <Pressable onPress={showModal}>
              <Avatar.Icon icon={editedDevice.iconName} size={40} style={styles.avatar} />
            </Pressable>
            <TextInput
              key="device-name"
              label={translate('device-name')}
              mode='outlined'
              keyboardType='default'
              style={styles.rightTextBox}
              value={editedDevice.name}
              onChangeText={(value) => setEditedDevice({...editedDevice, name: value})}
            />
          </View>

          <View style={styles.twoSelectionSection}>
            <TextInput
              key="watt"
              label={translate('watt')}
              mode="outlined"
              keyboardType='numeric'
              style={styles.leftTextBox}
              value={editedDevice.watt.toString()}
              onChangeText={(value) => setEditedDevice({...editedDevice, watt: Number(value)})}
            />
            <TextInput
              key="count"
              label={translate('piece-u')}
              mode='outlined'
              keyboardType='numeric'
              style={styles.rightTextBox}
              value={editedDevice.count.toString()}
              onChangeText={(value) => setEditedDevice({...editedDevice, count: Number(value.replace(/[^0-9]/g, ''))})}
            />
          </View>

          <View style={styles.twoSelectionSection}>
            <TextInput
              key="hours"
              label={translate('hours-day')}
              mode="outlined"
              keyboardType='numeric'
              style={styles.leftTextBox}
              value={editedDevice.dailyHours.toString()}
              onChangeText={(value) => setEditedDevice({...editedDevice, dailyHours: Number(value)})}
            />
            <TextInput
              key="days"
              label={translate('days-week')}
              mode='outlined'
              keyboardType='numeric'
              style={styles.rightTextBox}
              value={editedDevice.weeklyDays.toString()}
              onChangeText={(value) => setEditedDevice({...editedDevice, weeklyDays: Number(value)})}
            />
          </View>

          {showHelperText && (
            <View style={styles.helperTextContainer}>
              <Text style={styles.helperText}>{helperText}</Text>
            </View>
          )}


          <Button mode="contained" icon="content-save" style={styles.saveButton} onPress={handleSaveDevice}>{translate('save-device')}</Button>
          {mode === "edit" && <Button mode="contained" icon="delete" color='#D33F49' style={styles.saveButton} onPress={handleDeleteDevice}>{translate('delete-device')}</Button>}
        </>
      ) : (
        <ActivityIndicator animating={true} />
      )}
    </ScrollView>
  )
}

export default DeviceForm

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  modalContainer: {
    backgroundColor: 'white',
    height: hp(50),
    margin: wp(4),
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  nameAndAvatarSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(0.5)
  },
  avatar: {
    marginRight: wp(1),
  },
  twoSelectionSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.5)
  },
  leftTextBox: {
    flex: 1,
    height: 40,
    marginRight: wp(1)
  },
  rightTextBox: {
    flex: 1,
    height: 40,
    marginLeft: wp(1)
  },
  helperTextContainer: {
    paddingVertical: hp(0.5)
  },
  helperText: {
    fontSize: 12,
    color: '#D33F49'
  },
  saveButton: {
    marginTop: hp(1)
  }
})