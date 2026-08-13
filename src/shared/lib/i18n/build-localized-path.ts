import type { Locale } from '@/shared/config/i18n/config';

import { isValidLocale } from './is-valid-locale';

interface BuildLocalizedPathParams {
  pathname: string;
  newLang: Locale;
}

export function buildLocalizedPath({
  pathname,
  newLang,
}: BuildLocalizedPathParams): string {
  if (!isValidLocale(newLang)) {
    throw new Error(`Unknown language: ${newLang}`);
  }

  const segments = pathname.split('/');
  const currentLang = segments[1];

  if (currentLang === newLang) {
    return pathname;
  }

  if (!currentLang || !isValidLocale(currentLang)) {
    return `/${newLang}${pathname}`;
  }

  segments[1] = newLang;

  return segments.join('/') || '/';
}
