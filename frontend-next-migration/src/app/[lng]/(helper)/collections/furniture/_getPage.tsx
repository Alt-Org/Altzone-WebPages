import { createPage } from '@/app/_helpers';
import { getServerTranslation } from '@/shared/i18n';

export async function _getPage(lng: string) {
    const { t } = await getServerTranslation(lng, 'furniture');

    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
