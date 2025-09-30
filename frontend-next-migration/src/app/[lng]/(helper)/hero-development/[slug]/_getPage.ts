import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { color, HeroManager, HeroSlug, HeroWithGroup } from '@/entities/Hero';
import { HeroDevelopmentPageProps } from '@/preparedPages/HeroDevelopmentPage';
import { getRouteOneHeroDevPage } from '@/shared/appLinks/RoutePaths';
import { baseUrl, defaultOpenGraph } from '@/shared/seoConstants';

function getHeroOgImage(hero: HeroWithGroup) {
    return `${baseUrl}${typeof hero.srcImg === 'string' ? hero.srcImg : hero.srcImg.src}`;
}

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
    const ogImage = getHeroOgImage(currentHero);

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
                images: [
                    {
                        url: ogImage,
                        alt: `${title} - ${currentHero.groupName}`,
                    },
                ],
            },
            alternates: { canonical: path },
        }),
    });
}
