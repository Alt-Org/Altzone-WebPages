import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { HeroManager, HeroSlug, HeroWithGroup } from '@/entities/Hero';
import { getRouteOneHeroPage } from '@/shared/appLinks/RoutePaths';
import { HeroPageProps } from '@/preparedPages/HeroesPages';
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

    const heroes = heroManager.getAllHeroes();
    const prevHero =
        heroManager.getHeroBeforeSpecificHero(currentHero.id) || (heroes.at(-1) as HeroWithGroup);
    const nextHero =
        heroManager.getHeroAfterSpecificHero(currentHero.id) || (heroes.at(0) as HeroWithGroup);

    const prevHeroLink = getRouteOneHeroPage(prevHero.slug);
    const nextHeroLink = getRouteOneHeroPage(nextHero.slug);

    // Routes & SEO
    const relPath = getRouteOneHeroPage(encodeURIComponent(currentHero.slug));
    const path = `/${lng}${relPath}`;
    const title = currentHero.title;
    const description = currentHero.description;
    const keywords = `${t('head-keywords')}, ${currentHero.title}, ${currentHero.groupEnum}, ${currentHero.groupName}`;
    const ogImage = getHeroOgImage(currentHero);

    return createPage<HeroPageProps>({
        buildPage: () => ({
            newSelectedHero: currentHero,
            prevHeroLink: prevHeroLink,
            nextHeroLink: nextHeroLink,
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
