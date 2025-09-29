import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { HeroGroup } from '@/entities/Hero';
import { SingleDefensePageProps } from '@/preparedPages/DefenseGalleryPages';
import { getRouteDefenseGalleryGroupPage } from '@/shared/appLinks/RoutePaths';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string, heroGroup: string) {
    const { t } = await useServerTranslation(lng, 'heroes');

    if (!Object.values(HeroGroup).includes(heroGroup as HeroGroup)) {
        notFound();
    }

    const groupName = t(`groups.${heroGroup}.name`, heroGroup);
    const groupDesc = t(`groups.${heroGroup}.description`, t('og-description'));

    // Routes & SEO
    const relPath = getRouteDefenseGalleryGroupPage(encodeURIComponent(heroGroup as HeroGroup));
    const path = `/${lng}${relPath}`;
    const title = `${t('og-title')} - ${groupName}`;
    const keywords = `${t('head-keywords')}, ${groupName}`;

    return createPage<SingleDefensePageProps>({
        buildPage: () => ({
            heroGroup: heroGroup as HeroGroup,
        }),
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
            },
            alternates: { canonical: path },
        }),
    });
}
