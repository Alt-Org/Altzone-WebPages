import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { categories } from '@/entities/Furniture';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'furniturecategory');
    const translations: Record<string, string> = {};
    Object.entries(categories).map((index) => {
        const name = index[1].name;
        translations[name] = t(name);

        return true;
    });

    return createPage({
        buildPage: () => ({
            translations: translations,
            textback: t('text-back'),
            textresults: t('results'),
            textnoresults: t('no-results'),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
