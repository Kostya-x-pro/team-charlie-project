'use client';

import { type ReactNode, useState } from 'react';

import { I18nextProvider } from 'react-i18next';

import type { Locale } from '@/shared/config/i18n/config';
import { createI18nInstance } from '@/shared/lib/i18n/create-i18n-instance';

interface Props {
  lang: Locale;
  children: ReactNode;
}

export const I18nProvider = ({ lang, children }: Props) => {
  const [instance] = useState(() => createI18nInstance(lang));

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
};