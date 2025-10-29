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
            prevHeroLink,
            nextHeroLink,
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
