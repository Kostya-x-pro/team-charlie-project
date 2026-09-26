'use client';

import {
  LOCALE_COOKIE_KEY,
  LOCALE_COOKIE_MAX_AGE,
  type Locale,
} from '@/shared/config/i18n/config';

export function setLocaleCookie(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE_KEY}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}
