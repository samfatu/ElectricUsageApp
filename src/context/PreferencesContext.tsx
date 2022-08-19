import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { NativeModules } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { arDefaultValues, deDefaultValues, enDefaultValues, esDefaultValues, frDefaultValues, jaDefaultValues, koDefaultValues, ptDefaultValues, trDefaultValues, zhDefaultValues } from '../constants';
import { Preferences } from '../types';
import { getCurrencySymbol, getIsCurrencyLeft } from '../utils/currencyDetails';

export const preferencesStorage = new MMKV({
  id: 'preferences',
  encryptionKey: 'temp'
});

const getDefaultValues = (): Preferences => {
  const deviceLang = NativeModules.I18nManager.localeIdentifier;

  switch (deviceLang.substring(0,2)) {
    case "en":
      return enDefaultValues;
    case "tr":
      return trDefaultValues;
    case "ar":
      return arDefaultValues;
    case "de":
      return deDefaultValues;
    case "es":
      return esDefaultValues;
    case "fr":
      return frDefaultValues;
    case "ja":
      return jaDefaultValues;
    case "ko":
      return koDefaultValues;
    case "pt":
      return ptDefaultValues;
    case "zh":
      return zhDefaultValues;
    default:
      return enDefaultValues;
  }
}
const PreferencesContext = createContext(getDefaultValues());

const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<Preferences>(getDefaultValues());

  useEffect(() => {
    setPreferences({...preferences, changePreferences: construct });
    construct();
  }, [])

  const construct = () => {
    let storedCurrency = preferencesStorage.getString('currency');
    let storedLanguage = preferencesStorage.getString('language');
    let storedPrice = preferencesStorage.getNumber('price');

    if (storedCurrency && storedLanguage && storedPrice) {
      setPreferences({
        currencyName: storedCurrency,
        currencySymbol: getCurrencySymbol(storedCurrency),
        currencyLeft: getIsCurrencyLeft(storedCurrency),
        language: storedLanguage,
        price: storedPrice,
        changePreferences: construct
      });
    } else {
      preferencesStorage.set('currency', preferences.currencyName);
      preferencesStorage.set('language', preferences.language);
      preferencesStorage.set('price', preferences.price);
    }
  }

  const listener = preferencesStorage.addOnValueChangedListener((changedKey) => {
    const newValue = preferencesStorage.getString(changedKey);

    if (newValue) {
      if (changedKey === 'currency') {
        setPreferences({
          ...preferences,
          currencyName: newValue,
          currencySymbol: getCurrencySymbol(newValue),
          currencyLeft: getIsCurrencyLeft(newValue),
        })
      } else if (changedKey === 'language') {
        setPreferences({...preferences, language: newValue});
      }
    } else {
      const newValue = preferencesStorage.getNumber(changedKey);

      if (newValue) {
        setPreferences({...preferences, price: Number(newValue)});
      }
    }
  })

  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  )
}

export { PreferencesContext, PreferencesProvider };
