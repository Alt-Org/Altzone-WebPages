import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { SingleFurnitureCollectionPageProps } from '@/preparedPages/FurnitureCollectionsPages';
import { baseUrl } from '@/shared/seoConstants';
import React from 'react';

type Props = React.ComponentProps<typeof SingleFurnitureCollectionPageProps>;

export async function _getPage(lng: string, group: string) {
    const { t } = await useServerTranslation(lng, 'furniture');

    // Try to fetch set name/description from i18n, with fallbacks
    const toTitleCase = (text: string) =>
        text
            .trim()
            .replace(/[-_]+/g, ' ')
            .replace(/\b[a-z]/gi, (ch) => ch.toLocaleUpperCase());

    const setName = t(`sets.${group}.name`, toTitleCase(group)); // toTitleCase: e.g. "neuro" → "Neuro" (first letter uppercase)
    const setDesc = t(`sets.${group}.description`, t('head-description'));

    // SEO
    const path = `/${lng}/collections/furniture/set/${group}`;
    const imageAbs = `${baseUrl}/images/opengraph-image.png`;
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
            alternates: { canonical: path },
            openGraph: {
                type: 'website',
                title,
                description: setDesc,
                url: path,
                images: [{ url: imageAbs, width: 1200, height: 630 }],
            },
        }),
    });
}
