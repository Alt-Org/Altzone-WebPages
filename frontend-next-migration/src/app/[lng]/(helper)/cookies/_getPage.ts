import { createPage } from '@/app/_helpers';
import { CookiesPageProps } from '@/preparedPages/CookiesPage';
import { makeCookiesSectionsWithI18n } from '@/entities/PresentationPackages';
import { useServerTranslation } from '@/shared/i18n';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'cookies');
    return createPage<CookiesPageProps>({
        buildPage: () => ({
            sections: makeCookiesSectionsWithI18n(t),
            title: t('main-title'),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
