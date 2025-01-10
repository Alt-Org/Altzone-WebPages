import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { FurniturePageProps } from '@/preparedPages/FurniturePages';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'furniture');
    return createPage<FurniturePageProps>({
        buildPage: () => ({
            buttonSearchLabel: t('search'),
            buttonCategoriesLabel: t('categories'),
            header: t('furnituresets-title'),
            comingSoon: t('furnituresets-morecomingsoon'),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
