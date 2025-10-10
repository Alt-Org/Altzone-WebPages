import { createPage } from '@/app/_helpers';
import { slugToCategoryNameMap } from '@/entities/NewsV2/model/newsCategorySlugMap';
import { getServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';

export async function _getPage(lng: string, slug: string) {
    const { t } = await getServerTranslation(lng, 'news');
    if (!slug || !slugToCategoryNameMap[slug]) {
        return notFound();
    }
    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
// This file is used to generate the page data for the news category page.
