import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';
import { Preferences } from '../types';

export const preferencesStorage = new MMKV({
  id: 'preferences',
  encryptionKey: 'temp'
});

const defaultValues: Preferences = {
  currency: '₺',
  price: 1.25,
  lang: 'tr'
}

const PreferencesContext = createContext(defaultValues);

const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<Preferences>(defaultValues);

  useEffect(() => {
    let storedPreferences = preferencesStorage.getString('preferences');

    if (storedPreferences) {
      console.log('StoredPreferences found!');
      setPreferences(JSON.parse(storedPreferences));
    } else {
      preferencesStorage.set('preferences', JSON.stringify(preferences));
    }
  }, [])

  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  )
}

export { PreferencesContext, PreferencesProvider };
