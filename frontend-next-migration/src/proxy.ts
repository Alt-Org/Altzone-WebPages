import acceptLanguage from 'accept-language';
import { NextRequest, NextResponse } from 'next/server';
import { fallbackLng, languages, cookieName } from './shared/i18n/settings/settings';
import { getPathLanguage } from './shared/i18n/settings/routing';

acceptLanguage.languages(languages);

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|images|icons|documents|robots).*)',
    ],
};

function getPreferredLanguage(req: NextRequest) {
    const savedLanguage = req.cookies.get(cookieName)?.value;

    return (
        languages.find((language) => language === savedLanguage) ||
        acceptLanguage.get(req.headers.get('Accept-Language') ?? '') ||
        fallbackLng
    );
}

export function proxy(req: NextRequest) {
    if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1)
        return NextResponse.next();
    const pathLanguage = getPathLanguage(req.nextUrl.pathname);
    if (pathLanguage) {
        const response = NextResponse.next();
        const isPrefetch =
            req.headers.has('next-router-prefetch') || req.headers.get('purpose') === 'prefetch';

        if (!isPrefetch && req.cookies.get(cookieName)?.value !== pathLanguage) {
            response.cookies.set(cookieName, pathLanguage, { path: '/' });
        }

        return response;
    }

    if (req.nextUrl.pathname.startsWith('/_next')) return NextResponse.next();

    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = `/${getPreferredLanguage(req)}${req.nextUrl.pathname}`;
    return NextResponse.redirect(redirectUrl);
}
