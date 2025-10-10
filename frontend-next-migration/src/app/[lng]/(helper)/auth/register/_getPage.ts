import { getServerTranslation } from '@/shared/i18n';
import { createPage } from '@/app/_helpers';
import { defaultOpenGraph } from '@/shared/seoConstants';
import { getRouteRegisterPage } from '@/shared/appLinks/RoutePaths';

export async function _getPage(lng: string) {
    const { t } = await getServerTranslation(lng, 'auth');
    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title: t('auth-register-head-title'),
            description: t('auth-register-head-description'),
            keywords: t('auth-register-head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('auth-register-og-title'),
                description: t('auth-register-og-description'),
                url: `/${lng}${getRouteRegisterPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteRegisterPage()}`,
            },
        }),
    });
}
