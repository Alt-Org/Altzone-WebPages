import { MainPageProps } from '@/preparedPages/MainPage';
import { useServerTranslation } from '@/shared/i18n';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import gameImg from '@/shared/assets/images/mainpage/HandGraphicWithBattle.png';
import ContactImg from '@/shared/assets/images/Orang_hero.webp';
import {
    getRouteAllHeroesPage,
    getRouteComicsPage,
    getRouteGalleryPage,
    getRouteAboutPage,
} from '@/shared/appLinks/RoutePaths';
import { createPage } from '@/app/_helpers';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'main');

    const { t: tPG } = await useServerTranslation(lng, 'picture-galleries');

    return createPage<MainPageProps>({
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
        buildPage: () => ({
            playWithUs: {
                title: t('playWithUs-title'),
                webGl: {
                    title: t('PlayOnline'),
                    link: AppExternalLinks.webgl,
                    titleDownload: t('playWithUs-download'),
                    text: t('playWithUs-text'),
                    downloadText: t('playWithUs-download-text'),
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
                subDescription: t('main-sub-description'),
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
                title: t('project-description-title'),
                infoText: t('project-description-text'),
                socialsText: t('socials-text'),
                seeMoreLink: {
                    text: t('gallery-seeMore'),
                    href: getRouteAboutPage(),
                },
                socialMediaLinks: [
                    AppExternalLinks.igPost1,
                    AppExternalLinks.igPost2,
                    AppExternalLinks.fbPost1,
                ],
                videoLink: AppExternalLinks.previewVideoYoutube,
                gameImg: gameImg.src,
            },
            galleryCopy: {
                title: t('project-description-title'),
                infoText: t('project-description-text'),
                socialsText: t('socials-text'),
                seeMoreLink: {
                    text: t('gallery-seeMore'),
                    href: getRouteAboutPage(),
                },
                socialMediaLinks: [
                    AppExternalLinks.igPost1,
                    AppExternalLinks.igPost2,
                    AppExternalLinks.fbPost1,
                ],
                videoLink: AppExternalLinks.previewVideoYoutube,
                gameImg: gameImg.src,
            },
            contactSection: {
                title: t('contact-title'),
                googlePLayLink: AppExternalLinks.duunitori,
                linkText: t('contact-linkText'),
            },
        }),
    });
}
