import { createPage } from '@/app/_helpers';
import { getRouteLoginPage } from '@/shared/appLinks/RoutePaths';
import { getServerTranslation } from '@/shared/i18n';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string) {
    const { t } = await getServerTranslation(lng, 'auth');
    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title: t('auth-login-head-title'),
            description: t('auth-login-head-description'),
            keywords: t('auth-login-head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('auth-login-og-title'),
                description: t('auth-login-og-description'),
                url: `/${lng}${getRouteLoginPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteLoginPage()}`,
            },
        }),
    });
}
