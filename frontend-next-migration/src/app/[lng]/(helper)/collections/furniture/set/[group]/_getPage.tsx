import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
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
    const { t } = await useServerTranslation(lng, 'furniture');
    const manager = new FurnitureManager();
    const set = manager.getFurnitureSet(group);
    if (!set) notFound();

    // Title-casing fallback (e.g. "neuro" -> "Neuro")
    const toTitleCase = (text: string) =>
        text
            .trim()
            .replace(/[-_]+/g, ' ')
            .replace(/\b[a-z]/gi, (ch) => ch.toLocaleUpperCase());

    const setName = t(`sets.${group}.name`, toTitleCase(group));
    const setDesc = t(`sets.${group}.description`, t('head-description'));

    // Routes & SEO
    const relPath = `/collections/furniture/set/${encodeURIComponent(group)}`;
    const path = `/${lng}${relPath}`;
    const title = `${setName} - ${t('head-title')}`;
    const keywords = `${t('head-keywords')}, ${setName}`;
    const ogImageUrl = getOgImageUrl(set);
    const ogImage = ogImageUrl
        ? ({ url: ogImageUrl, alt: `${setName} - ${t('furniture-collections-title')}` } as const)
        : null;

    const ogImages = ogImage ? [ogImage] : (defaultOpenGraph.images ?? []);

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
