import type { MetadataRoute } from 'next';
import { envHelper } from '@/shared/const/envHelper';

export const dynamic = 'force-static';

/**
 * Generate a sitemap.xml file.
 * @constant {string} siteUrl - The base domain for all URLs, fetched from envHelper.
 * @returns {MetadataRoute.Sitemap} A Sitemap object that contains page URLs and other information.
 * @property {string} url - Page URL.
 * @property {Date} lastModified - The last modification date of the page.
 * @property {'always'|'daily'|'weekly'|'monthly'|'yearly'|'never'} changefreq - Page change frequency.
 * @property {number} priority - Page importance (0.0-1.0).
 * Example usage:
 * [
 *   {
 *     url: "https://altzone.fi/fi/news",
 *     lastModified: new Date(),
 *     changeFrequency: "daily",
 *     priority: 0.9
 *   }
 * ]
 */

const siteUrl = envHelper.appDomain;

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${siteUrl}`,
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 1.0,
        },
        {
            url: `${siteUrl}/fi/news`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${siteUrl}/fi/heroes`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${siteUrl}/fi/hero-development`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${siteUrl}/fi/clans`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${siteUrl}/fi/picture-galleries`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${siteUrl}/fi/comics`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${siteUrl}/fi/furniture`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${siteUrl}/fi/artGame`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${siteUrl}/fi/join-us`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${siteUrl}/fi/team`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
    ];
}
