import { Locale } from "../../config/i18n";
import { isValidLocale } from "./isValidLocale";

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

  const segments = pathname.split("/");
  const currentLang = segments[1];

  if (currentLang === newLang) {
    return pathname;
  }

  if (!currentLang || !isValidLocale(currentLang)) {
    return `/${newLang}${pathname}`;
  }

  segments[1] = newLang;

  return segments.join("/") || "/";
}
