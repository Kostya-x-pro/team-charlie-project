import { NextResponse, type NextRequest } from 'next/server';

import {
  LOCALE_COOKIE_KEY,
  LOCALE_COOKIE_MAX_AGE,
} from '@/shared/config/i18n/config';
import { buildLocalizedPath } from '@/shared/lib/i18n/build-localized-path';
import { isValidLocale } from '@/shared/lib/i18n/is-valid-locale';
import { resolveLocale } from '@/shared/lib/i18n/resolve-locale';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const firstSegment = pathname.split('/')[1] ?? '';

  if (firstSegment && isValidLocale(firstSegment)) {
    const cookieLocale = req.cookies.get(LOCALE_COOKIE_KEY)?.value;

    if (cookieLocale !== firstSegment) {
      const response = NextResponse.next();

      response.cookies.set(LOCALE_COOKIE_KEY, firstSegment, {
        path: '/',
        maxAge: LOCALE_COOKIE_MAX_AGE,
        sameSite: 'lax',
      });

      return response;
    }

    return NextResponse.next();
  }

  const cookieLocale = req.cookies.get(LOCALE_COOKIE_KEY)?.value ?? '';
  const acceptLanguage = req.headers.get('accept-language') ?? '';
  const resolvedLocale = resolveLocale({
    urlLocale: firstSegment,
    cookieValue: cookieLocale,
    acceptLanguage,
  });

  const url = req.nextUrl.clone();
  url.pathname = buildLocalizedPath({ pathname, newLang: resolvedLocale });

  return NextResponse.redirect(url);
}
