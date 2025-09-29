import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { SingleFurnitureCollectionPageProps } from '@/preparedPages/FurnitureCollectionsPages';
import { defaultOpenGraph } from '@/shared/seoConstants';
import React from 'react';

type Props = React.ComponentProps<typeof SingleFurnitureCollectionPageProps>;

export async function _getPage(lng: string, group: string) {
    const { t } = await useServerTranslation(lng, 'furniture');

    // Title-casing fallback (e.g. "neuro" -> "Neuro")
    const toTitleCase = (text: string) =>
        text
            .trim()
            .replace(/[-_]+/g, ' ')
            .replace(/\b[a-z]/gi, (ch) => ch.toLocaleUpperCase());

    const setName = t(`sets.${group}.name`, toTitleCase(group));
    const setDesc = t(`sets.${group}.description`, t('head-description'));

    // Routes & SEO (hepler handles encoding + correct / collection base)
    const relPath = `/collections/furniture/set/${encodeURIComponent(group)}`;
    const path = `/${lng}${relPath}`;
    const title = `${setName} - ${t('head-title')}`;
    const keywords = `${setName}, ${t('head-keywords')}`;

    return createPage<Props>({
        buildPage: () => ({
            collectionId: group,
        }),
        buildSeo: () => ({
            title,
            description: setDesc,
            keywords,
            openGraph: {
                ...defaultOpenGraph,
                type: 'website',
                title,
                description: setDesc,
                url: path,
            },
            alternates: { canonical: path },
        }),
    });
}
