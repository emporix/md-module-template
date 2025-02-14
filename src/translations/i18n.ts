import i18n, { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'
import TRANSLATIONS_EN from './en'
import TRANSLATIONS_DE from './de'
const resources: Resource = {
  en: {
    translation: TRANSLATIONS_EN,
  },
  de: {
    translation: TRANSLATIONS_DE,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
