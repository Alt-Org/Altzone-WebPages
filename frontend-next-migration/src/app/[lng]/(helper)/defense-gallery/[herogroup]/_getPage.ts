import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { HeroGroup } from '@/entities/Hero';
import { initializeHeroGroups } from '@/entities/Hero/model/initializeHeroGroups';
import { StaticImageData } from 'next/image';
import { SingleDefensePageProps } from '@/preparedPages/DefenseGalleryPages';
import { getRouteDefenseGalleryGroupPage } from '@/shared/appLinks/RoutePaths';
import { baseUrl, defaultOpenGraph } from '@/shared/seoConstants';

function getOgImageUrl(info?: ReturnType<typeof initializeHeroGroups>[HeroGroup]) {
    const candidate =
        (info?.srcImg as string | StaticImageData | undefined) ??
        (info?.heroes?.[0]?.srcImg as string | StaticImageData | undefined) ??
        (defaultOpenGraph.images?.[0]?.url as string | undefined);

    const src = typeof candidate === 'string' ? candidate : candidate?.src;
    if (!src) return null;
    return /^https?:\/\//i.test(src) ? src : `${baseUrl}${src}`;
}

export async function _getPage(lng: string, heroGroup: string) {
    const { t } = await useServerTranslation(lng, 'heroes');

    if (!Object.values(HeroGroup).includes(heroGroup as HeroGroup)) {
        notFound();
    }

    const group = heroGroup as HeroGroup;
    const groups = initializeHeroGroups(t);
    const info = groups[group];

    const groupName = info?.name ?? group;
    const groupDesc = info?.description ?? t('defense-gallery-description');

    // Routes & SEO
    const relPath = getRouteDefenseGalleryGroupPage(encodeURIComponent(group));
    const path = `/${lng}${relPath}`;
    const title = `${t('og-title')} - ${groupName}`;
    const keywords = `${t('head-keywords')}, ${groupName}`;

    const ogImageUrl = getOgImageUrl(info);
    const ogImages = ogImageUrl
        ? [{ url: ogImageUrl, alt: `${groupName} - ${t('defense-gallery')}` }]
        : (defaultOpenGraph.images ?? []);

    return createPage<SingleDefensePageProps>({
        buildPage: () => ({ heroGroup: group }),
        buildSeo: () => ({
            title,
            description: groupDesc,
            keywords,
            openGraph: {
                ...defaultOpenGraph,
                type: 'website',
                title,
                description: groupDesc,
                url: path,
                images: ogImages,
            },
            alternates: { canonical: path },
        }),
    });
}
