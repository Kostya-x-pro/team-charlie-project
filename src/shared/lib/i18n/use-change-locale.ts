'use client';

import { useRouter } from 'next/navigation';

import type { Locale } from '@/shared/config/i18n/config';

import { buildLocalizedPath } from './build-localized-path';
import { isValidLocale } from './is-valid-locale';
import { setLocaleCookie } from './set-locale-cookie';

export const useChangeLocale = () => {
  const router = useRouter();

  return (newLang: Locale) => {
    const currentUrl = new URL(window.location.href);
    const currentSegment = currentUrl.pathname.split('/')[1] ?? '';

    if (isValidLocale(currentSegment) && currentSegment === newLang) return;

    currentUrl.pathname = buildLocalizedPath({
      pathname: currentUrl.pathname,
      newLang,
    });

    // Оставляем только первый hash, если URL уже был испорчен.
    const hash = currentUrl.hash.slice(1).split('#')[0];
    currentUrl.hash = hash ?? '';

    setLocaleCookie(newLang);

    router.push(`${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
  };
};
