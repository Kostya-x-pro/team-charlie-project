import { createInstance } from 'i18next';
import en from 'public/locales/en/translation.json';
import ru from 'public/locales/ru/translation.json';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LOCALE, type Locale } from '@/shared/config/i18n';

const RESOURCES = {
  en: { translation: en },
  ru: { translation: ru },
} as const;

export const createI18nInstance = (locale: Locale) => {
  const instance = createInstance();

  void instance.use(initReactI18next).init({
    resources: RESOURCES,
    lng: locale,
    fallbackLng: DEFAULT_LOCALE,
    initAsync: false,
    interpolation: {
      escapeValue: false,
    },
  });

  return instance;
};
