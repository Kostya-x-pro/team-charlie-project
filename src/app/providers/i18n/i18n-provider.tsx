'use client';

import { ReactNode, useRef } from 'react';

import { I18nextProvider } from 'react-i18next';

import type { Locale } from '@/shared/config/i18n';
import { createI18nInstance } from '@/shared/lib/i18n/instance';

interface I18nProviderProps {
  lang: Locale;
  children: ReactNode;
}

export const I18nProvider = ({ lang, children }: I18nProviderProps) => {
  const instanceRef = useRef<ReturnType<typeof createI18nInstance> | null>(
    null,
  );

  if (!instanceRef.current) {
    instanceRef.current = createI18nInstance(lang);
  }

  return (
    <I18nextProvider key={lang} i18n={instanceRef.current}>
      {children}
    </I18nextProvider>
  );
};
