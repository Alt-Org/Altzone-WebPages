import { MainPageProps } from '@/preparedPages/MainPage';
import { useServerTranslation } from '@/shared/i18n';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import {
    getRouteAllHeroesPage,
    getRouteComicsPage,
    getRouteGalleryPage,
    getRouteMainPage,
} from '@/shared/appLinks/RoutePaths';
import { createPage } from '@/app/_helpers';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'main');

    const { t: tPG } = await useServerTranslation(lng, 'picture-galleries');

    return createPage<MainPageProps>({
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('og-title'),
                description: t('og-description'),
                url: `${getRouteMainPage()}${lng}`,
            },
        }),
        buildPage: () => ({
            playWithUs: {
                title: t('playWithUs-title'),
                webGl: {
                    title: t('PlayOnline'),
                    link: AppExternalLinks.webgl,
                },
                googlePLayLink: AppExternalLinks.downloadAndroid,
                belowNavs: [
                    {
                        title: t('playWithUs-OpenPositions-title'),
                        body: t('playWithUs-OpenPositions-body'),
                        link: AppExternalLinks.duunitori,
                        isExternal: true,
                    },
                    {
                        title: t('playWithUs-BecomeATester-title'),
                        body: t('playWithUs-BecomeATester-body'),
                        link: AppExternalLinks.discord,
                        isExternal: true,
                    },
                ],
                webGlNotice: t('playWithUs-WebGLNotice'),
            },
            projectDescription: {
                title: t('main-title'),
                description: t('main-description'),
                descriptionArray: t('project-description-array', {
                    returnObjects: true,
                }) as unknown as string[],
            },
            getToKnowComics: {
                title: t('getToKnowComics-title'),
                buttonParams: { innerText: t('getToKnowComics'), href: getRouteComicsPage() },
            },
            videoAndGalleries: {
                videoLink: AppExternalLinks.previewVideoYoutube,
                title: t('videoAndGalleries-title'),
            },
            heroesBlocks: {
                title: t('classifiedHeroesBlocks-title'),
                seeMoreLink: {
                    text: t('classifiedHeroesBlocks-seeMore'),
                    href: getRouteAllHeroesPage(),
                },
            },
            gallery: {
                title: tPG('picture-galleries'),
                infoText: tPG('info-text'),
                socialsText: tPG('socials-text'),
                seeMoreLink: {
                    text: t('gallery-seeMore'),
                    href: getRouteGalleryPage(),
                },
                socialMediaLinks: [
                    AppExternalLinks.igPost1,
                    AppExternalLinks.igPost2,
                    AppExternalLinks.fbPost1,
                ],
                videoLink: AppExternalLinks.previewVideoYoutube,
            },
        }),
    });
}
