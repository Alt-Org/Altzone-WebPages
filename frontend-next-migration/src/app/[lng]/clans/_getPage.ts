import {useServerTranslation} from "@/shared/i18n";

export async function _getPage (lng: string){
    const {t} = await useServerTranslation(lng, 'clan');

    const seo = {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }

    const page = {}

    return {
        page,
        seo
    }

}