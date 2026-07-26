"use client";

import { usePathname, useRouter } from "next/navigation";

import i18n from "../index";

import { languages } from "../config";

import { setDefaultLocale, buildLocalizedPath } from "../helpers";

export function useLocale() {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLang: string) => {
    if (!pathname || !newLang) return;

    const newPath = buildLocalizedPath({ pathname, newLang });

    setDefaultLocale(newLang);
    i18n.changeLanguage(newLang);
    router.push(newPath);
  };

  return { languages, switchLanguage };
}
