import { createPage } from '@/app/_helpers';
import { EthicalGuidelinesPageProps } from '@/preparedPages/EthicalGuidelinesPage';
import { makeEthicalGuidelinesSectionsWithI18n } from '@/entities/PresentationPackages';
import { getServerTranslation } from '@/shared/i18n';
import { getRouteEthicalGuidelinesPage } from '@/shared/appLinks/RoutePaths';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string) {
    const { t } = await getServerTranslation(lng, 'ethics');

    return createPage<EthicalGuidelinesPageProps>({
        buildPage: () => ({
            sections: makeEthicalGuidelinesSectionsWithI18n(t),
            title: t('main-title'),
        }),
        buildSeo: () => ({
            title: t('main-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('og-title'),
                description: t('og-description'),
                url: `/${lng}${getRouteEthicalGuidelinesPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteEthicalGuidelinesPage()}`,
            },
        }),
    });
}
