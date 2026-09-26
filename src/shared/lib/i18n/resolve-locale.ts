import { DEFAULT_LOCALE, type Locale } from '@/shared/config/i18n/config';

import { isValidLocale } from './is-valid-locale';

interface ResolveLocaleParams {
  urlLocale: string;
  cookieValue: string;
  acceptLanguage?: string;
}

export function resolveLocale({
  urlLocale,
  cookieValue,
  acceptLanguage,
}: ResolveLocaleParams): Locale {
  const preferredFromHeader = acceptLanguage
    ?.split(',')
    .map(value => value.trim().split(';')[0]?.split('-')[0]?.toLowerCase())
    .find(value => value && isValidLocale(value));

  const candidates = [urlLocale, cookieValue, preferredFromHeader];

  for (const candidate of candidates) {
    if (candidate && isValidLocale(candidate)) {
      return candidate;
    }
  }

  return DEFAULT_LOCALE;
}
