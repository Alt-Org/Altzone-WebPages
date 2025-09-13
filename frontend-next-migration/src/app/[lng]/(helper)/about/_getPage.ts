import { useServerTranslation } from '@/shared/i18n';
import { createPage } from '@/app/_helpers';
import { AboutPageProps } from '@/preparedPages/AboutPage';
import { defaultOpenGraph } from '@/shared/seoConstants';
import { getRouteAboutPage } from '@/shared/appLinks/RoutePaths';

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
            openGraph: {
                ...defaultOpenGraph,
                title: t('og-title'),
                description: t('og-description'),
                url: `/${lng}${getRouteAboutPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteAboutPage()}`,
            },
        }),
    });
}
