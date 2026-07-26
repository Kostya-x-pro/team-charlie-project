import { languages } from "../config";

interface IBuildLocalizedPath {
  pathname: string;
  newLang: string;
}

export function buildLocalizedPath({
  pathname,
  newLang,
}: IBuildLocalizedPath): string {
  if (!languages.includes(newLang)) {
    console.log(`Unknown language: ${newLang}`);
  }

  const segments = pathname.split("/");
  const currentLocaleIndex = languages.includes(segments[1]) ? 1 : -1;

  if (currentLocaleIndex === -1) {
    return `/${newLang}${pathname}`;
  }

  segments[currentLocaleIndex] = newLang;

  return segments.join("/") || "/";
}
