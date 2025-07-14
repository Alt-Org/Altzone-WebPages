import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { HeroManager, HeroSlug, HeroWithGroup, HeroGroup } from '@/entities/Hero';
import { getRouteDefenseGalleryHeroPage } from '@/shared/appLinks/RoutePaths';
import { HeroPageProps } from '@/preparedPages/HeroesPages';

export async function _getPage(lng: string, herogroup: string, slug: string) {
    const { t } = await useServerTranslation(lng, 'heroes');
    const heroManager = new HeroManager(t);

    const currentHero = heroManager.getHeroBySlug(slug as HeroSlug);

    if (!currentHero) {
        notFound();
    }

    // Get heroes only from the specific group
    const groupHeroes = heroManager.getHeroesBySpecificGroup(herogroup as HeroGroup);

    if (!groupHeroes) {
        notFound();
    }

    // Find the current hero's index in the group
    const currentHeroIndex = groupHeroes.findIndex((hero) => hero.id === currentHero.id);

    if (currentHeroIndex === -1) {
        // If the hero is not in this group, redirect to not found
        notFound();
    }

    // Get previous and next heroes within the same group
    const prevHero =
        currentHeroIndex > 0
            ? groupHeroes[currentHeroIndex - 1]
            : groupHeroes[groupHeroes.length - 1];

    const nextHero =
        currentHeroIndex < groupHeroes.length - 1
            ? groupHeroes[currentHeroIndex + 1]
            : groupHeroes[0];

    const prevHeroLink = getRouteDefenseGalleryHeroPage(herogroup, prevHero.slug);
    const nextHeroLink = getRouteDefenseGalleryHeroPage(herogroup, nextHero.slug);

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
