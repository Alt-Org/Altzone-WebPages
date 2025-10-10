import { getServerTranslation } from '@/shared/i18n';
import { createPage } from '@/app/_helpers';
import { ComingPageProps } from '@/preparedPages/ComingPage';
import { defaultOpenGraph } from '@/shared/seoConstants';
import { getRouteComingSoonPage } from '@/shared/appLinks/RoutePaths';

export async function _getPage(lng: string) {
    const { t } = await getServerTranslation(lng, 'coming');
    return createPage<ComingPageProps>({
        buildPage: () => ({
            title: t('title'),
            text: t('text'),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('og-title'),
                description: t('og-description'),
                url: `/${lng}${getRouteComingSoonPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteComingSoonPage()}`,
            },
        }),
    });
}
