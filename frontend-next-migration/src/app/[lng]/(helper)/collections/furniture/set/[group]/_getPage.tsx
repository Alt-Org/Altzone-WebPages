import { createPage } from '@/app/_helpers';
import { getServerTranslation } from '@/shared/i18n';
import { SingleFurnitureCollectionPageProps } from '@/preparedPages/FurnitureCollectionsPages';
import { baseUrl, defaultOpenGraph } from '@/shared/seoConstants';
import { FurnitureManager } from '@/entities/Furniture';
import React from 'react';

type Props = React.ComponentProps<typeof SingleFurnitureCollectionPageProps>;

function getOgImageUrl(set: ReturnType<FurnitureManager['getFurnitureSet']>) {
    const img = set?.coverWebp ?? set?.cover;
    if (!img) return null;
    const src = typeof img === 'string' ? img : img.src;
    return /^https?:\/\//i.test(src) ? src : `${baseUrl}${src}`;
}

export async function _getPage(lng: string, group: string) {
    const { t } = await getServerTranslation(lng, 'furniture');

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
                images: ogImages,
            },
            alternates: { canonical: path },
        }),
    });
}
