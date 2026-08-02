"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultLang } from "@/shared/config/i18n";

import en from "public/locales/en/translation.json";
import ru from "public/locales/ru/translation.json";

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: defaultLang,
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
