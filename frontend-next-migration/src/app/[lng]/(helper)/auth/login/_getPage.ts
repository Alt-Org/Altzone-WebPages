import {createPage} from "@/app/_helpers";
import {useServerTranslation} from "@/shared/i18n";

export async function _getPage (lng: string){
    const {t} = await useServerTranslation(lng, 'auth');
    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title: t("auth-login-head-title"),
            description: t("auth-login-head-description"),
            keywords: t("auth-login-head-keywords"),
        })
    });
}