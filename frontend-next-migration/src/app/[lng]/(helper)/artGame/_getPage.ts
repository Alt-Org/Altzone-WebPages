import { createPage } from '@/app/_helpers';
import { GameArtPageProps } from '@/preparedPages/GameArtPage';
import { makeArtGameSectionsWithI18n } from '@/entities/PresentationPackages';
import { useServerTranslation } from '@/shared/i18n';
import { defaultOpenGraph } from '@/shared/seoConstants';
import { getRouteGameArtPage } from '@/shared/appLinks/RoutePaths';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'artGame');

    return createPage<GameArtPageProps>({
        buildPage: () => ({
            sections: makeArtGameSectionsWithI18n(t),
            title: t('section-title'),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('og-title'),
                description: t('og-description'),
                url: `/${lng}${getRouteGameArtPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteGameArtPage()}`,
            },
        }),
    });
}
