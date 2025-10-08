import { createPage } from '@/app/_helpers';
import { slugToCategoryNameMap } from '@/entities/NewsV2/model/newsCategorySlugMap';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { getRouteNewsCategoryPage } from '@/shared/appLinks/RoutePaths';
import { baseUrl, defaultOpenGraph } from '@/shared/seoConstants';

const toAbsolute = (src?: string | null) =>
    !src ? null : /^https?:\/\//i.test(src) ? src : `${baseUrl}${src}`;

export async function _getPage(lng: string, slug: string) {
    const { t } = await useServerTranslation(lng, 'news');
    if (!slug || !slugToCategoryNameMap[slug]) {
        notFound();
    }

    const categoryName =
        slugToCategoryNameMap[slug] ??
        slug.replace(/-/g, ' ').replace(/\b\w/g, (ch: string) => ch.toUpperCase());

    // Routes & SEO
    const relPath = getRouteNewsCategoryPage(encodeURIComponent(slug));
    const path = `/${lng}${relPath}`;
    const title = `${categoryName} - ${t('head-title')}`;
    const description = t('head-description');
    const keywords = `${t('head-keywords')}, ${categoryName}`;

    // OG image: default only (no category-specific image exists)
    const ogDefault = defaultOpenGraph.images?.[0]?.url ?? null;
    const ogUrl = toAbsolute(ogDefault);
    const ogImages = ogUrl
        ? [{ url: ogUrl, alt: `${categoryName} — ${t('head-title')}` }]
        : (defaultOpenGraph.images ?? []);

    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title,
            description,
            keywords,
            openGraph: {
                ...defaultOpenGraph,
                type: 'website',
                title,
                description,
                url: path,
                images: ogImages,
            },
            alternates: { canonical: path },
        }),
    });
}
// This file is used to generate the page data for the news category page.
