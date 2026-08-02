"use client";

import { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "@/shared/lib/i18n/instance";

interface I18nProviderProps {
  lang: string;
  children: ReactNode;
}

export default function I18nProvider({ lang, children }: I18nProviderProps) {
  useEffect(() => {
    console.log("render");

    if (i18n.resolvedLanguage !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
