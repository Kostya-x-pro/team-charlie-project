import { Locale, defaultLang } from "../../config/i18n";
import { isValidLocale } from "./isValidLocale";

interface ResolveLocaleParams {
  urlLocale: string;
  cookieValue: string;
  acceptLanguage?: string;
}

export const COOKIE_KEY = "language" as const;

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

export function setLocaleCookie(locale: Locale): void {
  if (!isValidLocale(locale) || typeof document === "undefined") return;

  document.cookie = `${COOKIE_KEY}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
