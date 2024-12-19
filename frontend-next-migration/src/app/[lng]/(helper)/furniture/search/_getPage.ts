import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { FurnitureSearchPageProps } from '@/preparedPages/FurniturePages';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'furnituresearch');
    return createPage<FurnitureSearchPageProps>({
        buildPage: () => ({
            header: t('results'),
            placeholder: t('search-placeholder'),
            textback: t('text-back'),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
