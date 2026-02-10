import { createPage } from '@/app/_helpers';
import { getServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { HeroManager, HeroSlug, HeroWithGroup } from '@/entities/Hero';
import { getRouteOneHeroPage } from '@/shared/appLinks/RoutePaths';
import { SingleHeroPageProps } from '@/preparedPages/HeroesPages';
import { baseUrl, defaultOpenGraph } from '@/shared/seoConstants';

function getOgImageUrl(hero: HeroWithGroup) {
    const src = typeof hero.srcImg === 'string' ? hero.srcImg : hero.srcImg.src;
    return /^https?:\/\//i.test(src) ? src : `${baseUrl}${src}`;
}

async function getCurrentHero(
    heroManager: HeroManager,
    slug: string,
    lng: string,
): Promise<HeroWithGroup> {
    const locale = lng as 'en' | 'fi' | 'ru';
    let currentHero = await heroManager.getHeroBySlugAsync(slug as HeroSlug, locale);
    if (!currentHero) {
        // eslint-disable-next-line no-console
        console.log(`[heroes/_getPage] Hero "${slug}" not found in Directus, trying static data`);
        currentHero = heroManager.getHeroBySlug(slug as HeroSlug);
    }
    if (!currentHero) {
        // eslint-disable-next-line no-console
        console.error(`[heroes/_getPage] Hero "${slug}" not found in Directus or static data`);
        notFound();
    }
    return currentHero;
}

function getNavigationHeroes(
    heroes: HeroWithGroup[],
    currentHero: HeroWithGroup,
): { prevHero: HeroWithGroup; nextHero: HeroWithGroup } {
    const currentHeroIndex = heroes.findIndex((hero) => hero.id === currentHero.id);
    const prevHero =
        currentHeroIndex > 0
            ? heroes[currentHeroIndex - 1]
            : (heroes.at(-1) as HeroWithGroup | undefined);
    const nextHero =
        currentHeroIndex < heroes.length - 1
            ? heroes[currentHeroIndex + 1]
            : (heroes.at(0) as HeroWithGroup | undefined);

    // Fallback to current hero if navigation heroes not found
    return {
        prevHero: prevHero || currentHero,
        nextHero: nextHero || currentHero,
    };
}

function buildSeoData(currentHero: HeroWithGroup, lng: string, t: (key: string) => string) {
    const relPath = getRouteOneHeroPage(encodeURIComponent(currentHero.slug));
    const path = `/${lng}${relPath}`;
    const title = currentHero.title;
    const description = currentHero.description;
    const keywords = `${t('head-keywords')}, ${currentHero.title}, ${currentHero.groupEnum}, ${currentHero.groupName}`;
    const ogImageUrl = getOgImageUrl(currentHero);
    const ogImage = ogImageUrl
        ? ({ url: ogImageUrl, alt: `${title} - ${currentHero.groupName}` } as const)
        : null;
    const ogImages = ogImage ? [ogImage] : (defaultOpenGraph.images ?? []);

    return {
        title,
        description,
        keywords,
        path,
        ogImages,
    };
}

export async function _getPage(lng: string, slug: string) {
    const { t } = await getServerTranslation(lng, 'heroes');
    const heroManager = new HeroManager(t);

    // Initialize from Directus first (this may fail silently and use static data)
    await heroManager.initializeFromDirectus(lng as 'en' | 'fi' | 'ru');

    // Get current hero with fallback
    const currentHero = await getCurrentHero(heroManager, slug, lng);

    // Get all heroes for navigation (try Directus first, fallback to static)
    let heroes = await heroManager.getAllHeroesFromDirectus(lng as 'en' | 'fi' | 'ru');
    if (heroes.length === 0) {
        heroes = heroManager.getAllHeroes();
    }

    const { prevHero, nextHero } = getNavigationHeroes(heroes, currentHero);
    const prevHeroLink = getRouteOneHeroPage(prevHero.slug);
    const nextHeroLink = getRouteOneHeroPage(nextHero.slug);

    const seoData = buildSeoData(currentHero, lng, t);

    return createPage<SingleHeroPageProps>({
        buildPage: () => ({
            slug: currentHero.slug,
            newSelectedHero: currentHero,
            prevHeroLink: prevHeroLink,
            nextHeroLink: nextHeroLink,
        }),
        buildSeo: () => ({
            title: seoData.title,
            description: seoData.description,
            keywords: seoData.keywords,
            openGraph: {
                ...defaultOpenGraph,
                type: 'website',
                title: seoData.title,
                description: seoData.description,
                url: seoData.path,
                images: seoData.ogImages,
            },
            alternates: { canonical: seoData.path },
        }),
    });
}
