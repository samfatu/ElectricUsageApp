import React, { useContext, useState } from 'react';
import { FlatList, Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, Modal, Portal, Snackbar, TextInput } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { currencySymbolList, languageList } from '../constants';
import { PreferencesContext, preferencesStorage } from '../context/PreferencesContext';
import useLocales from '../hooks/useLocales';
import { Preferences } from '../types';
import { getCurrencySymbol, getIsCurrencyLeft } from '../utils/currencyDetails';

type SelectionType = "language" | "currency" | "price";

const Settings = () => {
  const { language , currencyName, currencySymbol, currencyLeft, price, changePreferences } = useContext(PreferencesContext);
  const [selectionModalOpened, setSelectionModalOpened] = useState<boolean>(false);
  const [selectionType, setSelectionType] = useState<SelectionType>("language");
  const [editedPreference, setEditedPreference] = useState<Preferences>({
    language,
    currencyName,
    currencySymbol,
    currencyLeft,
    price,
    changePreferences
  });
  const [priceHandle, setPriceHandle] = useState(price.toString());
  const [visible, setVisible] = useState(false);
  const { changeLang, translate } = useLocales();

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const showModal = () => setSelectionModalOpened(true);
  const hideModal = () => setSelectionModalOpened(false);

  const openLanguageList = () => {
    setSelectionType("language");
    showModal();
  }

  const openCurrencyList = () => {
    setSelectionType("currency");
    showModal();
  }

  const changePreference = (preferenceType: SelectionType, preference: string | number) => {
    switch (preferenceType) {
      case 'language':
        changeLang(preference as string);
        setEditedPreference({...editedPreference, language: preference as string });
        break;
      case 'currency':
        setEditedPreference({
          ...editedPreference,
          currencyName: preference as string,
          currencySymbol: getCurrencySymbol(preference as string),
          currencyLeft: getIsCurrencyLeft(preference as string)
        });
        break;
    }
    hideModal();
  }

  const savePreferences = () => {
    Keyboard.dismiss();
    preferencesStorage.set('language', editedPreference.language);
    preferencesStorage.set('currency', editedPreference.currencyName);
    preferencesStorage.set('price', priceHandle === "" ? 1 : Number(parseFloat(priceHandle).toFixed(6)));
    changePreferences();

    onToggleSnackBar();
  }

  return (
    <View style={styles.container}>
      <Portal>
        <Modal visible={selectionModalOpened} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          {selectionType === "language" ? (
            <FlatList
              keyExtractor={(item) => item.symbol}
              data={languageList}
              renderItem={(item) => (
                <Pressable
                  style={styles.listItem}
                  onPress={() => changePreference('language', item.item.symbol)}
                  android_ripple={{ color: '#e0e0e0'}}
                >
                  <Text style={{ color: '#333333' }}>{item.item.name}</Text>
                </Pressable>
              )}
            />
          ) : (
            <FlatList
              keyExtractor={(item) => item.name}
              data={currencySymbolList}
              renderItem={(item) => (
                <Pressable
                  style={styles.listItem}
                  onPress={() => changePreference('currency', item.item.name)}
                  android_ripple={{ color: '#e0e0e0'}}
                >
                  <Text style={{ color: '#333333' }}>{item.item.name}</Text>
                </Pressable>
              )}
            />
          )}
        </Modal>
      </Portal>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={2500}
      >
        {translate('preferences-success')}
      </Snackbar>
      <View style={styles.section}>
        <Text style={{ color: '#333333' }}>{translate('choose-language')}</Text>
        <Pressable style={styles.pickerContainer} onPress={openLanguageList}>
          <Text style={{ color: '#333333' }}>{languageList.find(lang => editedPreference.language === lang.symbol)?.name}</Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text style={{ color: '#333333' }}>{translate('choose-currency')}</Text>
        <Pressable style={styles.pickerContainer} onPress={openCurrencyList}>
          <Text style={{ color: '#333333' }}>{editedPreference.currencyName}</Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text style={{ color: '#333333' }}>{translate('enter-price')}</Text>
        <View style={{...styles.pickerContainer, height: 'auto', padding: 0 }}>
          <TextInput
            style={styles.priceInput}
            value={priceHandle}
            onChangeText={(text) => {
              if (text.match(/^[0-9.]+$/) && text.length < 12) {
                 if (!(text.split(".").length > 2 && text.slice(-1) === ".")) {
                  setPriceHandle(text);
                }
              } else if (text === "") {
                setPriceHandle("");
              }
            }}
            keyboardType='numeric'
          />
        </View>
        <Text style={{ fontSize: 12, marginTop: hp(1), color: '#333333' }}><Text>* </Text>{translate("help-text")}</Text>
        <Text style={{ fontSize: 12, color: '#333333' }}>{translate("help-note")}</Text>
      </View>
      <Button mode='contained' onPress={savePreferences}>{translate('save-preferences')}</Button>
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
  },
  modalContainer: {
    alignSelf: 'center',
    width: wp(50),
    backgroundColor: 'white',
    margin: wp(4),
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
  },
  section: {
    width: wp(80),
    marginBottom: hp(2),
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
  },
  listItem: {
    paddingVertical: hp(1),
    alignItems: 'center',
    width: '100%'
  }
})