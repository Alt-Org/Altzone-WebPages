import { useServerTranslation } from '@/shared/i18n';
import { createPage } from '@/app/_helpers';
import { AboutPageProps } from '@/preparedPages/AboutPage';
import { fetchMembersServer, getBehindYears, fetchDemographicsServer } from '@/entities/About';

export async function _getPage(lng: any) {
    const { t } = await useServerTranslation(lng, 'about');

    const behindCount = getBehindYears();

    const { nationalities, localities } = await fetchDemographicsServer().catch((error) => {
        console.error('Error fetching team data:', error);
        return { nationalities: 0, localities: 0 };
    });

    const uniqueMemberCount = await fetchMembersServer().catch((error) => {
        console.error('Error fetching team data:', error);
        return 0;
    });

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
            localityCount: localities,
            nationalityCount: nationalities,
            behindCount: behindCount,
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
