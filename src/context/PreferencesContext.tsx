import React, { createContext, ReactNode, useState } from 'react';
import { Preferences } from '../types';

const defaultValues: Preferences = {
  currency: '₺',
  price: 1.25,
  lang: 'tr'
}

const PreferencesContext = createContext(defaultValues);

const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<Preferences>(defaultValues);

  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  )
}

export { PreferencesContext, PreferencesProvider };
