import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import translationEn from "./locales/en.json";
import translationAr from "./locales/ar.json";

const resources = {
  en: { translation: translationEn },
  ar: { translation: translationAr },
};

const initI18n = async () => {
  const language = Localization.locale;

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
