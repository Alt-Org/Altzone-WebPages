import {useServerTranslation} from "@/shared/i18n";
import {makeArtGameSectionsWithI18n} from "@/entities/PresentationPackages";

export async function _getPage (lng: string){
    const {t} = await useServerTranslation(lng, 'artGame');

    const seo = {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }

    const sections = makeArtGameSectionsWithI18n(t);

    const page = {
        sections
    }

    return {
        page,
        seo
    }

}