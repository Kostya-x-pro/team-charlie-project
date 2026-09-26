'use client';

import Link from 'next/link';

import { useTranslation } from 'react-i18next';

export const NotFound = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage === 'ru' ? 'ru' : 'en';
  return (
    <main>
      <h1>404</h1>
      <p>{t('notFound.title')}</p>

      <Link href={`/${locale}`}>{t('notFound.back')}</Link>
    </main>
  );
};
