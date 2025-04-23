import { useServerTranslation } from '@/shared/i18n';
import { createPage } from '@/app/_helpers';
import { AboutPageProps } from '@/preparedPages/AboutPage';
import { object } from 'yup';

export async function _getPage(lng: any) {
    const { t } = await useServerTranslation(lng, 'about');
    return createPage<AboutPageProps>({
        buildPage: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
            storytitle: t('story-title'),
            project: t('project'),
            locality: t('locality'),
            nationality: t('nationality'),
            behind: t('behind'),
            story: t('V2019'),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
