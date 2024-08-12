import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import translationEN from "./src/locales/en/locale.json"
import translationFR from "./src/locales/fr/locale.json"
import translationDE from "./src/locales/de/locale.json"

const resources = {
    en: {
      translation: translationEN
    },
    de: {
      translation: translationDE
    },
    fr: {
        translation: translationFR
    }
}

export default i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr_FR",
    debug: true,
    fallbackLng: "fr_FR",
    interpolation: {
      escapeValue: false
    }
  })
