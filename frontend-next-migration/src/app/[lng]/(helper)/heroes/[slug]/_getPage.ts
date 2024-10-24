import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { HeroManager, HeroSlug, HeroWithGroup } from '@/entities/Hero';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';

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

    const prevHeroLink = generateHeroLink(prevHero.slug);
    const nextHeroLink = generateHeroLink(nextHero.slug);

    return createPage({
        buildPage: () => ({
            selectedHero: currentHero,
            prevHeroLink: prevHeroLink,
            nextHeroLink: nextHeroLink,
        }),
        // todo it should be kinda dynamic
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}

function generateHeroLink(heroSlug: string): string {
    return RoutePaths.HEROES_ONE.replace(':slug', heroSlug);
}
