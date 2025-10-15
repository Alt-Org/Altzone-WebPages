import { createPage } from '@/app/_helpers';
import { getServerTranslation } from '@/shared/i18n';
import { FurnitureSearchPageProps } from '@/preparedPages/FurniturePages';
import { defaultOpenGraph } from '@/shared/seoConstants';
import { getRouteFurnitureSearchPage } from '@/shared/appLinks/RoutePaths';

export async function _getPage(lng: string) {
    const { t } = await getServerTranslation(lng, 'furnituresearch');
    return createPage<FurnitureSearchPageProps>({
        buildPage: () => ({
            header: t('results'),
            placeholder: t('search-placeholder'),
            textBack: t('text-back'),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('og-title'),
                description: t('og-description'),
                url: `/${lng}${getRouteFurnitureSearchPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteFurnitureSearchPage()}`,
            },
        }),
    });
}
