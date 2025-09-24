import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { HeroGroup } from '@/entities/Hero';
import { SingleDefensePageProps } from '@/preparedPages/DefenseGalleryPages';
import { getRouteDefenseGalleryGroupPage } from '@/shared/appLinks/RoutePaths';
import defenceGalleryImage from '@/shared/assets/images/descriptionCard/defense_gallery.png';
import { baseUrl } from '@/shared/seoConstants';

export async function _getPage(lng: string, heroGroup: string) {
    const { t } = await useServerTranslation(lng, 'heroes');

    if (!Object.values(HeroGroup).includes(heroGroup as HeroGroup)) {
        notFound();
    }

    const groupName = t(`groups.${heroGroup}.name`, heroGroup);
    const groupDesc = t(`groups.${heroGroup}.description`, t('og-description'));

    // SEO
    const path = `/${lng}${getRouteDefenseGalleryGroupPage(heroGroup as HeroGroup)}`;
    const imageAbs = `${baseUrl}${defenceGalleryImage.src}`;
    const title = `${t('og-title')} - ${groupName}`;
    const keywords = `${t('head-keywords')}, ${groupName}`;

    return createPage<SingleDefensePageProps>({
        buildPage: () => ({
            heroGroup: heroGroup as HeroGroup,
        }),
        buildSeo: () => ({
            title,
            description: groupDesc,
            keywords,
            alternates: { canonical: path },
            openGraph: {
                type: 'website',
                title,
                description: groupDesc,
                url: path,
                images: [{ url: imageAbs, width: 1200, height: 630 }],
            },
        }),
    });
}
