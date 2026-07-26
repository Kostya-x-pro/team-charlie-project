import { languages, Locale, defaultLang } from "../config";

interface ResolveLocaleParams {
  urlLocale: string | undefined;
  cookieValue: string | undefined;
  acceptLanguage?: string;
}

export const COOKIE_KEY = "language" as const;

export function isValidLocale(value: string): value is Locale {
  return languages.includes(value);
}

export function resolveLocale({
  urlLocale,
  cookieValue,
  acceptLanguage,
}: ResolveLocaleParams): Locale {
  const preferredFromHeader = acceptLanguage?.split(",")[0]?.split("-")[0];

  const candidates = [urlLocale, cookieValue, preferredFromHeader];

  for (const candidate of candidates) {
    if (candidate && isValidLocale(candidate)) {
      return candidate;
    }
  }

  return defaultLang;
}

export function setDefaultLocale(locale: Locale): void {
  if (!isValidLocale(locale) || typeof document === "undefined") return;

  document.cookie = `${COOKIE_KEY}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
