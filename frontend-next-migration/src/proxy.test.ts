/** @jest-environment node */
import { NextRequest } from 'next/server';
import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server';
import { config, proxy } from './proxy';

describe('language proxy', () => {
    it.each([
        { headers: {}, language: 'en' },
        { headers: { 'accept-language': 'fi-FI,fi;q=0.9' }, language: 'fi' },
        {
            headers: { 'accept-language': 'fi', cookie: 'i18next=ru' },
            language: 'ru',
        },
    ])('redirects unlocalized URLs using $language', ({ headers, language }) => {
        const request = new NextRequest('https://altzone.fi/about?section=team', {
            headers: headers as HeadersInit,
        });

        const response = proxy(request);

        expect(response.status).toBe(307);
        expect(response.headers.get('location')).toBe(
            `https://altzone.fi/${language}/about?section=team`,
        );
    });

    it('allows localized pages without redirecting', () => {
        const response = proxy(new NextRequest('https://altzone.fi/fi/about'));

        expect(response.headers.get('location')).toBeNull();
        expect(response.headers.get('x-middleware-next')).toBe('1');
    });

    it('remembers the language from a localized referring page', () => {
        const request = new NextRequest('https://altzone.fi/en/about', {
            headers: { referer: 'https://altzone.fi/fi/' },
        });

        expect(proxy(request).cookies.get('i18next')?.value).toBe('fi');
    });

    it.each(['/api/test', '/_next/static/test.js', '/_next/image', '/images/test.png'])(
        'excludes %s from language routing',
        (url) => {
            expect(unstable_doesMiddlewareMatch({ config, url })).toBe(false);
        },
    );

    it.each(['/', '/fi/about', '/en/admin'])('routes %s through the proxy', (url) => {
        expect(unstable_doesMiddlewareMatch({ config, url })).toBe(true);
    });
});
