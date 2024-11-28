import { createPage } from '@/app/_helpers';
import { TeachersPageProps } from '@/preparedPages/TeachersPage';
import { useServerTranslation } from '@/shared/i18n';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'teachers');
    return createPage<TeachersPageProps>({
        buildPage: () => ({
            title: t('Teachers'),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
