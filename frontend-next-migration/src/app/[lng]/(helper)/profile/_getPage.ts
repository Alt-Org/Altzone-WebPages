import { createPage } from '@/app/_helpers';
import { ProfilePageProps } from '@/preparedPages/ProfilePage';
import { getRouteProfilePage } from '@/shared/appLinks/RoutePaths';
import { useServerTranslation } from '@/shared/i18n';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'profile');
    return createPage<ProfilePageProps>({
        buildPage: () => ({
            title: t('profile-deletion-title'),
            profileDeletionText: t('profile-deletion'),
            profileDeletionInfoText: t('profile-deletion-info'),
        }),
        // todo prepare them on the i18n side
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('og-title'),
                description: t('og-description'),
                url: `/${lng}${getRouteProfilePage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteProfilePage()}`,
            },
        }),
    });
}
