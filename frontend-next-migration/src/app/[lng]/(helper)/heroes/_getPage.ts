import { createPage } from '@/app/_helpers';
import { getRouteAllHeroesPage } from '@/shared/appLinks/RoutePaths';
import { useServerTranslation } from '@/shared/i18n';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'heroes');
    return createPage({
        buildPage: () => ({
            SectionHeroesBlocksTitle: t('section-title'),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('og-title'),
                description: t('og-description'),
                url: `/${lng}${getRouteAllHeroesPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteAllHeroesPage()}`,
            },
        }),
    });
}
