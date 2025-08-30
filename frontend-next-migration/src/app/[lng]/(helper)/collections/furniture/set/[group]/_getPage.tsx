import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { SingleFurnitureCollectionPageProps } from '@/preparedPages/FurnitureCollectionsPages';
import React from 'react';

type Props = React.ComponentProps<typeof SingleFurnitureCollectionPageProps>;

export async function _getPage(lng: string, group: string) {
    const { t } = await useServerTranslation(lng, 'furniture');

    return createPage<Props>({
        buildPage: () => ({
            collectionId: group,
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
