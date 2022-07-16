import { useContext } from "react";
import { PreferencesContext } from "../context/PreferencesContext";
import I18n from "../i18n/_i18n";

export default function useLocales() {
  const { t } = I18n;
  const { language: storedLanguge, price, currency, changePreferences } = useContext(PreferencesContext);

  const handleChangeLang = (lang: string) => {
    I18n.locale = lang;
    changePreferences({ price, currency, language: lang, changePreferences });
  }

  return {
    translate: t,
    language: storedLanguge,
    changeLang: handleChangeLang
  }
}