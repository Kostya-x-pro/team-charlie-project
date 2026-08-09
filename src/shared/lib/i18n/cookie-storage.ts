import {
  type Locale,
  DEFAULT_LOCALE,
  LOCALE_COOKIE_KEY,
  LOCALE_COOKIE_MAX_AGE,
} from '@/shared/config/i18n';

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

export function setLocaleCookie(locale: Locale): void {
  if (!isValidLocale(locale) || typeof document === 'undefined') return;

  document.cookie = `${LOCALE_COOKIE_KEY}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}
