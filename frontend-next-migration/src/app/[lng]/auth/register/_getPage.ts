import {useServerTranslation} from "@/shared/i18n";
import {createPage} from "@/app/_helpers";

export async function _getPage (lng: string){
    const {t} = await useServerTranslation(lng, 'auth');
    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title: t("auth-register-head-title"),
            description: t("auth-register-head-description"),
            keywords: t("auth-register-head-keywords"),
        })
    });
}