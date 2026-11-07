import acceptLanguage from 'accept-language';
import { NextRequest, NextResponse } from 'next/server';
import { fallbackLng, languages, cookieName } from './shared/i18n/settings/settings';

acceptLanguage.languages(languages);

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|images|icons|documents|robots).*)',
    ],
};

export function proxy(req: NextRequest) {
    if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1)
        return NextResponse.next();
    let lng;
    const languageCookie = req.cookies.get(cookieName)?.value;
    if (languageCookie) lng = acceptLanguage.get(languageCookie);
    if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
    if (!lng) lng = fallbackLng;

    // Redirect if lng in path is not supported
    if (
        !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
        !req.nextUrl.pathname.startsWith('/_next')
    ) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = `/${lng}${req.nextUrl.pathname}`;
        return NextResponse.redirect(redirectUrl);
    }

    const referer = req.headers.get('referer');
    if (referer) {
        const refererUrl = new URL(referer);
        const lngInReferer = languages.find((language) =>
            refererUrl.pathname.startsWith(`/${language}`),
        );
        const response = NextResponse.next();
        if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
        return response;
    }

    return NextResponse.next();
}
