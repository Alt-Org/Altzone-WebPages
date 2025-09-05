import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { defaultOpenGraph } from '@/shared/seoConstants';
import { getRouteClanLeadeboardPage } from '@/shared/appLinks/RoutePaths';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'clan');

    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title: t('leaderboard-head-title'),
            description: t('leaderboard-head-description'),
            keywords: t('leaderboard-head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('leaderboard-og-title'),
                description: t('leaderboard-og-description'),
                url: `/${lng}${getRouteClanLeadeboardPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteClanLeadeboardPage()}`,
            },
        }),
    });
}
