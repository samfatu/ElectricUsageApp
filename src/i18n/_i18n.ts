import I18n from 'i18n-js';
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import { preferencesStorage } from '../context/PreferencesContext';
import ar from './ar';
import de from './de';
import en from './en';
import es from './es';
import fr from './fr';
import ja from './ja';
import ko from './ko';
import pt from './pt';
import tr from './tr';
import zh from './zh';

const locales = RNLocalize.getLocales();

const storedPreference = preferencesStorage.getString('language');

if (storedPreference) {
  I18n.locale = storedPreference;
} else {
  I18n.locale = locales[0].languageTag;
}


export const isRtl = locales[0].isRTL;
I18nManager.forceRTL(isRtl);

I18n.fallbacks = true;
I18n.locales.no = 'en';
I18n.translations = {
  en,
  tr,
  es,
  de,
  ar,
  fr,
  ja,
  ko,
  pt,
  zh
};

export default I18n;