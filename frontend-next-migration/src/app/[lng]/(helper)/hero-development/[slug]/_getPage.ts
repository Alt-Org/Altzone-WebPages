import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { color, HeroManager, HeroSlug } from '@/entities/Hero';
import { HeroDevelopmentPageProps } from '@/preparedPages/HeroDevelopmentPage';
import { getRouteOneHeroDevPage } from '@/shared/appLinks/RoutePaths';
import { baseUrl } from '@/shared/seoConstants';

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

    // SEO
    const path = `/${lng}${getRouteOneHeroDevPage(currentHero.slug)}`;
    const imageAbs = `${baseUrl}/images/opengraph-image.png`;
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
            alternates: { canonical: path },
            openGraph: {
                type: 'website',
                title,
                description,
                url: path,
                images: [{ url: imageAbs, width: 1200, height: 630 }],
            },
        }),
    });
}
