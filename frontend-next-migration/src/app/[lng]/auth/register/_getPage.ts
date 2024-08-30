import {useServerTranslation} from "@/shared/i18n";

export async function _getPage (lng: string){
    const {t} = await useServerTranslation(lng, 'auth');

    const seo = {
        title: t("auth-register-head-title"),
        description: t("auth-register-head-description"),
        keywords: t("auth-register-head-keywords"),
    }

    const page = {}

    return {
        page,
        seo
    }

}