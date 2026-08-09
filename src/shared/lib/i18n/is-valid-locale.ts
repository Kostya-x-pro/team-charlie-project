import { LOCALES, Locale } from '@/shared/config/i18n';

export function isValidLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
