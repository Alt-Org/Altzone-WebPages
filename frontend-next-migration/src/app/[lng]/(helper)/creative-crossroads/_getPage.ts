import { getRouteCCPage } from '@/shared/appLinks/RoutePaths';
import { createPage } from '@/app/_helpers';
import { getServerTranslation } from '@/shared/i18n';

export async function _getPage(lng: string) {
    const { t } = await getServerTranslation(lng, 'creative-crossroads');

    return createPage({
        buildPage: () => ({
            title: t('title'),
            lng,
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
            alternates: {
                canonical: `/${lng}${getRouteCCPage()}`,
            },
        }),
    });
}
