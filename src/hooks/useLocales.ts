import { useContext } from "react";
import { PreferencesContext } from "../context/PreferencesContext";
import I18n from "../i18n/_i18n";

export default function useLocales() {
  const { t } = I18n;
  const { language: storedLanguge, price, currencyName, currencySymbol, currencyLeft, changePreferences } = useContext(PreferencesContext);

  const handleChangeLang = (lang: string) => {
    I18n.locale = lang;
    changePreferences({ price, currencyName, currencySymbol, currencyLeft, language: lang, changePreferences });
  }

  return {
    translate: t,
    language: storedLanguge,
    changeLang: handleChangeLang
  }
}