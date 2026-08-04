'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Locale } from '@/shared/config/i18n';
import {
  setLocaleCookie,
  buildLocalizedPath,
  isValidLocale,
} from '@/shared/lib/i18n';

export const useChangeLocale = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (newLang: Locale) => {
    if (!pathname || !newLang) return;

    const rawLang = pathname.split('/')[1] || '';
    const currentLang = isValidLocale(rawLang) ? rawLang : null;

    if (currentLang === newLang) return;

    const newPath = buildLocalizedPath({ pathname, newLang });
    const query = searchParams.toString();
    const newUrl = query ? `${newPath}?${query}` : newPath;

    setLocaleCookie(newLang);
    router.push(newUrl);
  };
};
