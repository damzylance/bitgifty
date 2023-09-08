import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importing translation files

import translationEN from "./locales/en/translation.json";
import translationES from "./locales/es/translation.json";

//Detecting locale language

const localeLang = localStorage.getItem("localeLang")
  ? localStorage.getItem("localeLang")
  : navigator.language.split("-")[0];

//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

//i18N Initialization

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: localeLang, //default language
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
