import {createPage} from "@/app/_helpers";
import {GameArtPageProps} from "@/preparedPages/GameArtPage";
import {makeArtGameSectionsWithI18n} from "@/entities/PresentationPackages";
import {useServerTranslation} from "@/shared/i18n";

export async function _getPage (lng: string){
    const {t} = await useServerTranslation(lng, 'artGame');

    return createPage<GameArtPageProps>({
        buildPage: () => ({
            sections: makeArtGameSectionsWithI18n(t)
        }),
        buildSeo: () => ({
            title: t("head-title"),
            description: t("head-description"),
            keywords: t("head-keywords")
        })
    });
}