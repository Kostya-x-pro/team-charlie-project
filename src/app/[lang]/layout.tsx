import type { Metadata } from 'next';

import { I18nProvider } from '@/app/providers/i18n/i18n-provider';
import '@/app/styles/globals.css';

import { DEFAULT_LOCALE } from '@/shared/config/i18n';
import { isValidLocale } from '@/shared/lib/i18n';

export const metadata: Metadata = {
  title: {
    default: 'Team Charlie Project',
    template: '%s | Team Charlie Project',
  },
  description: 'Team Charlie web application',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = isValidLocale(rawLang) ? rawLang : DEFAULT_LOCALE;

  return (
    <html lang={lang}>
      <body>
        <I18nProvider lang={lang}>{children}</I18nProvider>
      </body>
    </html>
  );
}
