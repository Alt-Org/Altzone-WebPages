import { useServerTranslation } from '@/shared/i18n';
import { createPage } from '@/app/_helpers';
import { AboutPageProps } from '@/preparedPages/AboutPage';
import { envHelper } from '@/shared/const/envHelper';

export async function _getPage(lng: any) {
    const { t } = await useServerTranslation(lng, 'about');

    let uniqueMemberCount = 0;

    try {
        const response = await fetch(`${envHelper.strapiHost}/items/members?limit=1000`);
        if (!response.ok) {
            console.error('Failed to fetch team data, status:', response.status);
        } else {
            const teamData = await response.json();
            if (Array.isArray(teamData?.data)) {
                const uniqueNames = new Set<string>();
                teamData.data.forEach((member: { name?: string }) => {
                    if (member?.name) uniqueNames.add(member.name);
                });
                uniqueMemberCount = uniqueNames.size;
            } else {
                console.error('Unexpected team data shape:', teamData);
            }
        }
    } catch (err) {
        console.error('Error fetching team data:', err);
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
            projectCount: t(uniqueMemberCount.toString()),
            localityCount: t('localityCount'),
            nationalityCount: t('nationalityCount'),
            behindCount: t('6'),
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
