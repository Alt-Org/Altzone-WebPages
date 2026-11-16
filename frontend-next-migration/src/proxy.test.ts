/** @jest-environment node */
import { NextRequest } from 'next/server';
import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server';
import { config, proxy } from './proxy';

describe('language proxy', () => {
    it.each([
        { headers: {}, language: 'en' },
        { headers: { 'accept-language': 'fi-FI,fi;q=0.9' }, language: 'fi' },
        { headers: { 'accept-language': 'fi', cookie: 'i18next=' }, language: 'fi' },
        { headers: { 'accept-language': 'fi', cookie: 'i18next=invalid' }, language: 'fi' },
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

    it('remembers the destination language when switching from another language', () => {
        const request = new NextRequest('https://altzone.fi/en/about', {
            headers: { referer: 'https://altzone.fi/fi/', cookie: 'i18next=fi' },
        });

        const response = proxy(request);
        expect(response.headers.get('location')).toBeNull();
        expect(response.cookies.get('i18next')).toEqual(
            expect.objectContaining({ value: 'en', path: '/' }),
        );
    });

    it('saves a directly opened localized page for subsequent navigation', () => {
        const response = proxy(new NextRequest('https://altzone.fi/fi/about'));
        const cookie = response.cookies.get('i18next');

        expect(cookie?.value).toBe('fi');
        const navigation = proxy(
            new NextRequest('https://altzone.fi/news', {
                headers: { cookie: `i18next=${cookie?.value}` },
            }),
        );
        expect(navigation.headers.get('location')).toBe('https://altzone.fi/fi/news');
    });

    it('preserves Finnish through an original news link after replacing an English preference', () => {
        const page = proxy(
            new NextRequest('https://altzone.fi/fi/news', {
                headers: {
                    cookie: 'i18next=en',
                    referer: 'https://altzone.fi/en/news',
                },
            }),
        );
        const savedLanguage = page.cookies.get('i18next')?.value;
        expect(savedLanguage).toBe('fi');

        const article = proxy(
            new NextRequest('https://altzone.fi/news/73?_rsc=article', {
                headers: {
                    cookie: `i18next=${savedLanguage}`,
                    'accept-language': 'en-US',
                    rsc: '1',
                    'next-url': '/fi/news',
                },
            }),
        );

        expect(article.status).toBe(307);
        expect(article.headers.get('location')).toBe('https://altzone.fi/fi/news/73?_rsc=article');
    });

    it.each([
        ['next-router-prefetch', '1'],
        ['purpose', 'prefetch'],
    ])('does not change the language preference while prefetching (%s)', (header, value) => {
        const response = proxy(
            new NextRequest('https://altzone.fi/en/about', {
                headers: { [header]: value, cookie: 'i18next=fi' },
            }),
        );

        expect(response.cookies.get('i18next')).toBeUndefined();
    });

    it('does not read the previous page language, even with an invalid referer', () => {
        const response = proxy(
            new NextRequest('https://altzone.fi/fi/about', {
                headers: { referer: 'invalid URL' },
            }),
        );

        expect(response.cookies.get('i18next')?.value).toBe('fi');
    });

    it('matches complete language segments rather than route-name prefixes', () => {
        const response = proxy(new NextRequest('https://altzone.fi/finance'));

        expect(response.headers.get('location')).toBe('https://altzone.fi/en/finance');
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
