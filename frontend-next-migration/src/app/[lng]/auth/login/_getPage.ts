import {useServerTranslation} from "@/shared/i18n";

export async function _getPage (lng: string){
    const {t} = await useServerTranslation(lng, 'auth');

    const seo = {
        title: t("auth-login-head-title"),
        description: t("auth-login-head-description"),
        keywords: t("auth-login-head-keywords"),
    }

    const page = {}

    return {
        page,
        seo
    }

}