import type { MetadataRoute } from 'next';

/**
 * Generate a sitemap.xml file.
 * @returns {MetadataRoute.Sitemap} A Sitemap object that contains page URLs and other information.
 * @property {string} url - Page URL.
 * @property {'always'|'daily'|'weekly'|'monthly'|'yearly'|'never'} changefreq - Page change frequency.
 * @property {number} priority - Page importance (0.0-1.0).
 */

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://altzone.fi',
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 1.0,
        },
        {
            url: 'https://altzone.fi/fi/news',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://altzone.fi/fi/heroes',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://altzone.fi/fi/hero-development',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://altzone.fi/fi/clans',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://altzone.fi/fi/picture-galleries',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: 'https://altzone.fi/fi/comics',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: 'https://altzone.fi/fi/furniture',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://altzone.fi/fi/artGame',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: 'https://altzone.fi/fi/join-us',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: 'https://altzone.fi/fi/team',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
    ];
}
