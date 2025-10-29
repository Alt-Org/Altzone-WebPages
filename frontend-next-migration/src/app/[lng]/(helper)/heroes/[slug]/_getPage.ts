import { createPage } from '@/app/_helpers';
import { getServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { HeroManager, HeroSlug, HeroWithGroup } from '@/entities/Hero';
import { getRouteOneHeroPage } from '@/shared/appLinks/RoutePaths';
import { HeroPageProps } from '@/preparedPages/HeroesPages';

/**
 * Narrow a route param (string) to a HeroSlug enum value.
 * This lets TypeScript know the slug is one of the allowed values.
 */
const HERO_SLUG_VALUES = Object.values(HeroSlug) as readonly string[];
const isHeroSlug = (slugCandidate: string): slugCandidate is HeroSlug =>
    HERO_SLUG_VALUES.includes(slugCandidate);

/**
 * Build data + SEO for /[lng]/heroes/[slug]
 *
 * Flow:
 * 1) Validate slug against HeroSlug enum.
 * 2) Fetch hero via HeroManager → CMS-first (Directus), fallback to legacy data.
 * 3) Compute prev/next hero links using the existing in-memory order.
 * 4) Return page props for the prepared Hero page and basic SEO.
 */
export async function _getPage(lng: string, slug: string) {
    const { t } = await getServerTranslation(lng, 'heroes');
    const heroManager = new HeroManager(t);

    // CMS-first fetch; falls back to hardcoded data if CMS is empty in dev
    if (!isHeroSlug(slug)) notFound();

    const currentHero = await heroManager.getHeroBySlugAsync(slug, lng as 'en' | 'fi' | 'ru');
    if (!currentHero) {
        notFound();
    }

    // Prev/Next navigation uses existing in-memory ordering for now
    const heroes = heroManager.getAllHeroes();
    const prevHero =
        heroManager.getHeroBeforeSpecificHero(currentHero.id) || (heroes.at(-1) as HeroWithGroup);
    const nextHero =
        heroManager.getHeroAfterSpecificHero(currentHero.id) || (heroes.at(0) as HeroWithGroup);

    // Route links for the adjacent heroes
    const prevHeroLink = getRouteOneHeroPage(prevHero.slug);
    const nextHeroLink = getRouteOneHeroPage(nextHero.slug);

    // Return page data for the prepared Hero page + minimal SEO
    return createPage<HeroPageProps>({
        buildPage: () => ({
            newSelectedHero: currentHero,
            prevHeroLink,
            nextHeroLink,
        }),
        buildSeo: () => ({
            title: currentHero.title,
            description: currentHero.description,
            keywords: `${t('head-keywords')}, ${currentHero.title}, ${currentHero.groupEnum}, ${currentHero.groupName}`,
        }),
    });
}
