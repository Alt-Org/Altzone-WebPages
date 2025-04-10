import { MetadataRoute } from 'next';
import { envHelper } from '@/shared/const/envHelper';

export const dynamic = 'force-static';

/**
 * Generate a sitemap.xml file for different languages (en, fi).
 * @returns {MetadataRoute.Sitemap} A Sitemap object containing page URLs for both English and Finnish versions.
 */
const siteUrl = `https://${envHelper.appDomain}`;

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = ['en', 'fi'];
    const routes = [
        '',
        'news',
        'heroes',
        'hero-development',
        'clans',
        'picture-galleries',
        'comics',
        'furniture',
        'artGame',
        'join-us',
        'team',
    ];

    // Generate sitemap for each locale
    const sitemap = [];

    for (const locale of locales) {
        for (const route of routes) {
            const url = `${siteUrl}/${locale}/${route}`;
            // Määritellään sallitut arvot changeFrequency:lle
            const changeFrequency: 'daily' | 'weekly' = locale === 'en' ? 'daily' : 'weekly';
            sitemap.push({
                url,
                lastModified: new Date(),
                changeFrequency,
                priority: 0.8,
            });
        }
    }

    return sitemap;
}
