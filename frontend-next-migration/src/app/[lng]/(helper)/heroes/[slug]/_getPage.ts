import { createPage } from '@/app/_helpers';
import { getServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { HeroManager, HeroSlug } from '@/entities/Hero';
import { SingleHeroPageProps } from '@/preparedPages/HeroesPages';

export async function _getPage(lng: string, slug: string) {
    const { t } = await getServerTranslation(lng, 'heroes');
    const heroManager = new HeroManager(t);

    const currentHero = heroManager.getHeroBySlug(slug as HeroSlug);
    if (!currentHero) {
        notFound();
    }

    return createPage<SingleHeroPageProps>({
        buildPage: () => ({
            slug: slug as HeroSlug,
        }),
        buildSeo: () => ({
            title: currentHero.title,
            description: currentHero.description,
            keywords: `${t('head-keywords')}, ${currentHero.title}, ${currentHero.groupEnum}, ${currentHero.groupName}`,
        }),
    });
}
