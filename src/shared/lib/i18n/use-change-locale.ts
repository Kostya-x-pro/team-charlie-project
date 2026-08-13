'use client';

import { usePathname, useRouter } from 'next/navigation';

import type { Locale } from '@/shared/config/i18n/config';

import { buildLocalizedPath } from './build-localized-path';
import { isValidLocale } from './is-valid-locale';
import { setLocaleCookie } from './set-locale-cookie';

export const useChangeLocale = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (newLang: Locale) => {
    if (!pathname) return;

    const currentSegment = pathname.split('/')[1] ?? '';

    if (isValidLocale(currentSegment) && currentSegment === newLang) return;

    const newPath = buildLocalizedPath({ pathname, newLang });
    const newUrl = `${newPath}${window.location.search}${window.location.hash}`;

    setLocaleCookie(newLang);
    router.push(newUrl);
  };
};
