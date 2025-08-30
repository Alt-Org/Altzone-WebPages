import { useServerTranslation } from '@/shared/i18n';
import { createPage } from '@/app/_helpers';
import { HeroDevelopmentPageProps } from '@/preparedPages/HeroDevelopmentPage';
import { defaultOpenGraph } from '@/shared/seoConstants';
import { getRouteHeroDevPage } from '@/shared/appLinks/RoutePaths';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'hero-development');
    return createPage<HeroDevelopmentPageProps>({
        buildPage: () => ({ hero: undefined }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('og-title'),
                description: t('og-description'),
                url: `/${lng}${getRouteHeroDevPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteHeroDevPage()}`,
            },
        }),
    });
}
