import { getRoutePitchaamoPage } from '@/shared/appLinks/RoutePaths';
import { createPage } from '@/app/_helpers';
import { getServerTranslation } from '@/shared/i18n';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string) {
    const { t } = await getServerTranslation(lng, 'pitchaamo');

    return createPage({
        buildPage: () => ({
            title: t('title'),
            lng,
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('og-title'),
                description: t('og-description'),
                url: `/${lng}${getRoutePitchaamoPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRoutePitchaamoPage()}`,
            },
        }),
    });
}
