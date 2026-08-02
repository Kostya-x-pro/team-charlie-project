import { usePathname, useRouter } from "next/navigation";

import { Locale } from "@/shared/config/i18n";
import {
  setLocaleCookie,
  buildLocalizedPath,
  isValidLocale,
} from "@/shared/lib/i18n";

export function useChangeLocale() {
  const pathname = usePathname();
  const router = useRouter();

  return (newLang: Locale) => {
    if (!pathname || !newLang) return;

    const rawLang = pathname.split("/")[1];
    const currentLang = isValidLocale(rawLang) ? rawLang : null;

    if (currentLang === newLang) return;

    const newPath = buildLocalizedPath({ pathname, newLang });

    setLocaleCookie(newLang);
    router.push(newPath);
  };
}
