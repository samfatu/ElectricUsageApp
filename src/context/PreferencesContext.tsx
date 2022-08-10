import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';
import { Preferences } from '../types';
import { getCurrencySymbol, getIsCurrencyLeft } from '../utils/currencyDetails';

export const preferencesStorage = new MMKV({
  id: 'preferences',
  encryptionKey: 'temp'
});

const defaultValues: Preferences = {
  currencySymbol: '$',
  currencyName: 'Dollar',
  currencyLeft: true,
  price: 1,
  language: 'en-US',
  changePreferences: () => {}
}

const PreferencesContext = createContext(defaultValues);

const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<Preferences>(defaultValues);

  useEffect(() => {
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
        changePreferences: setPreferences
      });
    } else {
      preferencesStorage.set('currency', preferences.currencyName);
      preferencesStorage.set('language', preferences.language);
      preferencesStorage.set('price', preferences.price);
    }
  }, [])

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
      } else {
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
