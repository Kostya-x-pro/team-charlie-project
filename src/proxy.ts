import { NextRequest, NextResponse } from 'next/server';

import { LOCALE_COOKIE_KEY } from '@/shared/config/i18n';
import {
  isValidLocale,
  resolveLocale,
  buildLocalizedPath,
} from '@/shared/lib/i18n';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
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
        maxAge: 31536000,
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
