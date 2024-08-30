import {useServerTranslation} from "@/shared/i18n";

export async function _getPage (lng: string){
    const {t} = await useServerTranslation(lng, 'comics');

    const seo = {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }

    const page = {
        title: t('Comics')
    }

    return {
        page,
        seo
    }

}