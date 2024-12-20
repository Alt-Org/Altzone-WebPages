import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { color, HeroManager, HeroSlug } from '@/entities/Hero';
import { HeroDevelopmentPageProps } from '@/preparedPages/HeroDevelopmentPage';

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

    return createPage<HeroDevelopmentPageProps>({
        buildPage: () => ({
            hero: currentHero,
        }),
        buildSeo: () => ({
            title: currentHero.title,
            description: currentHero.description,
            keywords: `${t('head-keywords')}, ${currentHero.title}, ${currentHero.groupEnum}, ${currentHero.groupName}`,
        }),
    });
}
