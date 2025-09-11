import { createPage } from '@/app/_helpers';
import { getRouteLeaderboardPage } from '@/shared/appLinks/RoutePaths';
import { useServerTranslation } from '@/shared/i18n';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'leaderboard');

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
                url: `/${lng}${getRouteLeaderboardPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteLeaderboardPage()}`,
            },
        }),
    });
}
