import { createPage } from '@/app/_helpers';
import { JoinUsProps } from '@/preparedPages/JoinUsPage';
import { useServerTranslation } from '@/shared/i18n';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'join-us');
    return createPage<JoinUsProps>({
        buildPage: () => ({
            title: t('join-us'),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
