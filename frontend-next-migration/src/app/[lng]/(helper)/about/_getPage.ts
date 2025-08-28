import { useServerTranslation } from '@/shared/i18n';
import { createPage } from '@/app/_helpers';
import { AboutPageProps } from '@/preparedPages/AboutPage';
import { fetchMembersServer } from '@/entities/About';

export async function _getPage(lng: any) {
    const { t } = await useServerTranslation(lng, 'about');

    let uniqueMemberCount: number = 0;

    try {
        uniqueMemberCount = await fetchMembersServer();
    } catch (e) {
        console.error('Error fetching team data:', e);
    }

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
            projectCount: uniqueMemberCount,
            localityCount: t('localityCount'),
            nationalityCount: t('nationalityCount'),
            behindCount: t('behindCount'),
            V2019: t('V2019'),
            V2020: t('V2020'),
            V2021: t('V2021'),
            V2022: t('V2022'),
            V2023: t('V2023'),
            V2024: t('V2024'),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
