import type { MetadataRoute } from 'next';
import { envHelper } from '@/shared/const/envHelper';

export const dynamic = 'force-static';

/**
 * Generate a sitemap.xml file.
 * @returns {MetadataRoute.Sitemap} A Sitemap object that contains page URLs and other information.
 * @property {string} url - Page URL.
 * @property {'always'|'daily'|'weekly'|'monthly'|'yearly'|'never'} changefreq - Page change frequency.
 * @property {number} priority - Page importance (0.0-1.0).
 */
const BASE_URL = envHelper.appDomain;

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${BASE_URL}`,
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/fi/news`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/fi/heroes`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/fi/hero-development`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/fi/clans`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/fi/picture-galleries`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/fi/comics`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${BASE_URL}/fi/furniture`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/fi/artGame`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/fi/join-us`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/fi/team`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
    ];
}
