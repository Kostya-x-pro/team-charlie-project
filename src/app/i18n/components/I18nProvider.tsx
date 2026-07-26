"use client";

import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../index";

interface I18nProviderProps {
  lang: string;
  children: ReactNode;
}

export default function I18nProvider({ lang, children }: I18nProviderProps) {
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
