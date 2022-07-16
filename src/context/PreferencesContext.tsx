import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';
import { Preferences } from '../types';

export const preferencesStorage = new MMKV({
  id: 'preferences',
  encryptionKey: 'temp'
});

const defaultValues: Preferences = {
  currency: '$',
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
      setPreferences({ currency: storedCurrency, language: storedLanguage, price: storedPrice, changePreferences: setPreferences });
    } else {
      preferencesStorage.set('currency', preferences.currency);
      preferencesStorage.set('language', preferences.language);
      preferencesStorage.set('price', preferences.price);
    }
  }, [])

  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  )
}

export { PreferencesContext, PreferencesProvider };
