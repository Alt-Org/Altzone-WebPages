import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { color, HeroManager, HeroSlug } from '@/entities/Hero';
import { HeroDevelopmentPageProps } from '@/preparedPages/HeroDevelopmentPage';
import { getRouteOneHeroDevPage } from '@/shared/appLinks/RoutePaths';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string, slug: string) {
    const { t } = await useServerTranslation(lng, 'heroes');
    const heroManager = new HeroManager(t);
    const currentHero = heroManager.getHeroBySlug(slug as HeroSlug);
    if (!currentHero) {
        notFound();
    }
    currentHero.stats.forEach((stat) => {
        stat.color = color[stat.name];
    });

    // Routes & SEO
    const relPath = getRouteOneHeroDevPage(encodeURIComponent(currentHero.slug));
    const path = `/${lng}${relPath}`;
    const title = currentHero.title;
    const description = currentHero.description;
    const keywords = `${t('head-keywords')}, ${currentHero.title}, ${currentHero.groupEnum}, ${currentHero.groupName}`;

    return createPage<HeroDevelopmentPageProps>({
        buildPage: () => ({
            hero: currentHero,
        }),
        buildSeo: () => ({
            title,
            description,
            keywords,
            openGraph: {
                ...defaultOpenGraph,
                type: 'website',
                title,
                description,
                url: path,
            },
            alternates: { canonical: path },
        }),
    });
}
