import { createPage } from '@/app/_helpers';
import { slugToCategoryNameMap } from '@/entities/NewsV2/model/newsCategorySlugMap';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { baseUrl } from '@/shared/seoConstants';

export async function _getPage(lng: string, slug: string) {
    const { t } = await useServerTranslation(lng, 'news');
    if (!slug || !slugToCategoryNameMap[slug]) {
        return notFound();
    }

    const categoryName = slugToCategoryNameMap[slug];

    // SEO
    const path = `/${lng}/news/category/${slug}`;
    const imageAbs = `${baseUrl}/images/opengraph-image.png`;
    const title = `${categoryName} - ${t('head-title')}`;
    const description = t('head-description');
    const keywords = `${t('head-keywords')}, ${categoryName}`;

    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title,
            description,
            keywords,
            alternates: { canonical: path },
            openGraph: {
                type: 'website',
                title,
                description,
                url: path,
                images: [{ url: imageAbs, width: 1200, height: 630 }],
            },
        }),
    });
}
// This file is used to generate the page data for the news category page.
