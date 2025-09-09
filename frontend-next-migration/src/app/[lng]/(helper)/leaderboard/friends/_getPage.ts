import { createPage } from '@/app/_helpers';
import { getRouteLeaderboardFriendsPage } from '@/shared/appLinks/RoutePaths';
import { useServerTranslation } from '@/shared/i18n';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'leaderboard');

    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title: t('friends-head-title'),
            description: t('friends-head-description'),
            keywords: t('friends-head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('friends-og-title'),
                description: t('friends-og-description'),
                url: `/${lng}${getRouteLeaderboardFriendsPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteLeaderboardFriendsPage()}`,
            },
        }),
    });
}
