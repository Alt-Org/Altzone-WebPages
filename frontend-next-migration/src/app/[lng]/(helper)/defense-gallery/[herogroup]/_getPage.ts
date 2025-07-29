import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { HeroGroup } from '@/entities/Hero';
import { SingleDefensePageProps } from '@/preparedPages/DefenseGalleryPages';

export async function _getPage(lng: string, heroGroup: string) {
    const { t } = await useServerTranslation(lng, 'heroes');

    if (!Object.values(HeroGroup).includes(heroGroup as HeroGroup)) {
        notFound();
    }

    return createPage<SingleDefensePageProps>({
        buildPage: () => ({
            heroGroup: heroGroup as HeroGroup,
        }),
        buildSeo: () => ({
            title: heroGroup,
            description: heroGroup,
            keywords: `${t('head-keywords')}, ${heroGroup}`,
        }),
    });
}
