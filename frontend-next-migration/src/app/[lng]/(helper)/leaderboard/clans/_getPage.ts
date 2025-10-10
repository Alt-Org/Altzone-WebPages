import { createPage } from '@/app/_helpers';
import { getRouteLeaderboardClansPage } from '@/shared/appLinks/RoutePaths';
import { getServerTranslation } from '@/shared/i18n';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string) {
    const { t } = await getServerTranslation(lng, 'leaderboard');

    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title: t('clans-head-title'),
            description: t('clans-head-description'),
            keywords: t('clans-head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('clans-og-title'),
                description: t('clans-og-description'),
                url: `/${lng}${getRouteLeaderboardClansPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteLeaderboardClansPage()}`,
            },
        }),
    });
}
