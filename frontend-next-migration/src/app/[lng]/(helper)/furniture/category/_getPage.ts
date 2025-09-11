import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { FurnitureCategoryPageProps } from '@/preparedPages/FurniturePages';
import { categories } from '@/entities/Furniture';
import { getRouteFurnitureCategoryPage } from '@/shared/appLinks/RoutePaths';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'furniturecategory');
    const translations: Record<string, string> = {};
    Object.entries(categories).map((index) => {
        const name = index[1].name;
        translations[name] = t(name);

        return true;
    });

    return createPage<FurnitureCategoryPageProps>({
        buildPage: () => ({
            translations: translations,
            textBack: t('text-back'),
            textResults: t('results'),
            textNoResults: t('no-results'),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('og-title'),
                description: t('og-description'),
                url: `/${lng}${getRouteFurnitureCategoryPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteFurnitureCategoryPage()}`,
            },
        }),
    });
}
