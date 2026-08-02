import { languages, Locale } from "../../../shared/config/i18n";

export function isValidLocale(value: string): value is Locale;
export function isValidLocale(value: string[]): value is Locale[];
export function isValidLocale(value: string | string[]): boolean {
  if (Array.isArray(value)) {
    return value.every((item) =>
      (languages as readonly string[]).includes(item),
    );
  }

  return (languages as readonly string[]).includes(value);
}
