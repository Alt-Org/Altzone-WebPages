import { createPage } from '@/app/_helpers';
import { getRouteOneNewsPage } from '@/shared/appLinks/RoutePaths';
import { getServerTranslation } from '@/shared/i18n';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string, id: string) {
    const { t } = await getServerTranslation(lng, 'news');
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
                url: `/${lng}${getRouteOneNewsPage(id)}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteOneNewsPage(id)}`,
            },
        }),
    });
}
