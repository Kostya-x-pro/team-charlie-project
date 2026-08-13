import type { ReactNode } from 'react';

import { notFound } from 'next/navigation';

import { I18nProvider } from '@/app/providers/i18n/i18n-provider';
import '@/app/styles/globals.css';

import { LOCALES } from '@/shared/config/i18n/config';
import { isValidLocale } from '@/shared/lib/i18n/is-valid-locale';

interface Props {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body>
        <I18nProvider key={lang} lang={lang}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
