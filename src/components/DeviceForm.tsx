import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Avatar, Button, IconButton, TextInput } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { PreferencesContext } from '../context/PreferencesContext';
import { Device } from '../types';

interface DeviceFormProps {
  device: Device;
  handleClose: () => void;
}

const DeviceForm = (props: DeviceFormProps) => {
  const [editedDevice, setEditedDevice] = useState<Device | null>(null);
  const [helperText, setHelperText] = useState<string>("");
  const [showHelperText, setShowHelperText] = useState<boolean>(false);
  const { device, handleClose } = props;
  const { currency, lang, price } = useContext(PreferencesContext);

  useEffect(() => {
    setEditedDevice(device)
  }, [props]);

  const handleSaveDevice = () => {
    if (validateInputs()) {
      setHelperText("");
      setShowHelperText(false);
      // TODO:SAVE TO THE STATE MANAGER
      // close
      handleClose();
    }
  }

  const validateInputs = () => {
    if (editedDevice) {
      // TODO: check for auto focus to related field
      if (editedDevice.dailyHours > 24 || editedDevice.dailyHours < 0) {
        setHelperText("Daily hours must be between 0 and 24");
        setShowHelperText(true);
        return false;
      }
      if (editedDevice.weeklyDays > 7 || editedDevice.weeklyDays < 0) {
        setHelperText("Daily hours must be between 0 and 7");
        setShowHelperText(true);
        return false;
      }
    }
    return true;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>Edit Device</Text>
        <IconButton icon="close" size={14} onPress={handleClose} />
      </View>

      {editedDevice ? (
        <>
          <View style={styles.nameAndAvatarSection}>
            <Avatar.Icon icon={editedDevice.iconName} size={40} style={styles.avatar} />
            <TextInput
              key="device-name"
              label="Device Name"
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
              label="Watt"
              mode="outlined"
              keyboardType='numeric'
              style={styles.leftTextBox}
              value={editedDevice.watt.toString()}
              onChangeText={(value) => setEditedDevice({...editedDevice, watt: Number(value)})}
            />
            <TextInput
              key="count"
              label="Count"
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
              label="Hours in a day"
              mode="outlined"
              keyboardType='numeric'
              style={styles.leftTextBox}
              value={editedDevice.dailyHours.toString()}
              onChangeText={(value) => setEditedDevice({...editedDevice, dailyHours: Number(value)})}
            />
            <TextInput
              key="days"
              label="Days in a week"
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

          <Button mode="contained" icon="content-save" style={styles.saveButton} onPress={handleSaveDevice}>Save Device</Button>

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
    color: 'red'
  },
  saveButton: {
    marginTop: hp(1)
  }
})