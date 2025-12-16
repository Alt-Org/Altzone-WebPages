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

export async function _getPage(lng: string, slug: string) {
    const { t } = await getServerTranslation(lng, 'heroes');
    const heroManager = new HeroManager(t);

    // Initialize from Directus first
    await heroManager.initializeFromDirectus(lng as 'en' | 'fi' | 'ru');

    // Try to get hero from Directus, fallback to static data
    let currentHero = await heroManager.getHeroBySlugAsync(
        slug as HeroSlug,
        lng as 'en' | 'fi' | 'ru',
    );
    if (!currentHero) {
        currentHero = heroManager.getHeroBySlug(slug as HeroSlug);
    }
    if (!currentHero) {
        notFound();
    }

    // Get all heroes from Directus for navigation
    const heroes = await heroManager.getAllHeroesFromDirectus(lng as 'en' | 'fi' | 'ru');
    const currentHeroIndex = heroes.findIndex((hero) => hero.id === currentHero!.id);
    const prevHero =
        currentHeroIndex > 0
            ? heroes[currentHeroIndex - 1]
            : (heroes.at(-1) as HeroWithGroup | undefined);
    const nextHero =
        currentHeroIndex < heroes.length - 1
            ? heroes[currentHeroIndex + 1]
            : (heroes.at(0) as HeroWithGroup | undefined);

    const prevHeroLink = getRouteOneHeroPage(prevHero.slug);
    const nextHeroLink = getRouteOneHeroPage(nextHero.slug);

    // Routes & SEO
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

    return createPage<SingleHeroPageProps>({
        buildPage: () => ({
            slug: currentHero.slug,
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
                images: ogImages,
            },
            alternates: { canonical: path },
        }),
    });
}
