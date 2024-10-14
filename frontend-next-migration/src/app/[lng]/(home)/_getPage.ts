import {MainPageProps} from "@/preparedPages/MainPage";
import {useServerTranslation} from "@/shared/i18n";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {createPage} from "@/app/_helpers";

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, "main");

    return createPage<MainPageProps>({
        buildSeo: () => ({
            title: t("head-title"),
            description: t("head-description"),
            keywords: t("head-keywords"),
        }),
        buildPage: () => ({
            playWithUs: {
                title: t("playWithUs-title"),
                webGl: {
                    title: t("PlayOnline"),
                    link: AppExternalLinks.webgl,
                },
                googlePLayLink: AppExternalLinks.downloadAndroid,
                belowNavs: [
                    {
                        title: t("playWithUs-OpenPositions-title"),
                        body: t("playWithUs-OpenPositions-body"),
                        link: AppExternalLinks.duunitori,
                        isExternal: true,
                    },
                    {
                        title: t("playWithUs-BecomeATester-title"),
                        body: t("playWithUs-BecomeATester-body"),
                        link: AppExternalLinks.discord,
                        isExternal: true,
                    },
                ],
                webGlNotice: t('playWithUs-WebGLNotice'),
            },
            projectDescription: {
                title: t("project-description-title"),
                description: t("project-description-text"),
            },
            getToKnowComics: {
                title: t("getToKnowComics-title"),
                buttonParams: { innerText: t("getToKnowComics"), href: RoutePaths.COMICS_GALLERY },
            },
            videoAndGalleries: {
                videoLink: AppExternalLinks.previewVideoYoutube,
                title: t("videoAndGalleries-title"),
            },
            classifiedHeroesBlocks: {
                title: t("classifiedHeroesBlocks-title"),
                seeMoreLink: {
                    text: t("classifiedHeroesBlocks-seeMore"),
                    href: RoutePaths.HEROES,
                },
            },
        }),
    });
}