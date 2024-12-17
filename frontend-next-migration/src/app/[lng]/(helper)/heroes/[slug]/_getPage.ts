import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { HeroManager, HeroSlug, HeroWithGroup } from '@/entities/Hero';
import { getRouteOneHeroPage } from '@/shared/appLinks/RoutePaths';
import { HeroPageProps } from '@/preparedPages/HeroesPages';

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

    return createPage<HeroPageProps>({
        buildPage: () => ({
            newSelectedHero: currentHero,
            prevHeroLink: prevHeroLink,
            nextHeroLink: nextHeroLink,
        }),
        buildSeo: () => ({
            title: currentHero.title,
            description: currentHero.description,
            keywords: `${t('head-keywords')}, ${currentHero.title}, ${currentHero.groupEnum}, ${currentHero.groupName}`,
        }),
    });
}
