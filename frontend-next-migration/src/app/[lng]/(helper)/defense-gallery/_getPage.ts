import { createPage } from '@/app/_helpers';
import { getRouteDefenseGalleryPage } from '@/shared/appLinks/RoutePaths';
import { useServerTranslation } from '@/shared/i18n';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'heroes');
    const defenceGalleryImage = '/images/defense_gallery.png';
    return createPage({
        buildPage: () => ({
            SectionHeroesBlocksTitle: t('section-title'),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
            openGraph: {
                images: [
                    {
                        url: `${defenceGalleryImage}`,
                    },
                ],
                title: t('og-title'),
                description: t('og-description'),
                url: `/${lng}${getRouteDefenseGalleryPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteDefenseGalleryPage()}`,
            },
        }),
    });
}
