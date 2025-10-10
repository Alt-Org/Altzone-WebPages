import { createPage } from '@/app/_helpers/_createPage';
import { getRouteTeamPage } from '@/shared/appLinks/RoutePaths';
import { getServerTranslation } from '@/shared/i18n';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string) {
    const { t } = await getServerTranslation(lng, 'members');

    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('og-title'),
                description: t('og-description'),
                url: `/${lng}${getRouteTeamPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteTeamPage()}`,
            },
        }),
    });
}
