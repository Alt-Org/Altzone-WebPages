import {createPage} from "@/app/_helpers";
import {useServerTranslation} from "@/shared/i18n";

export async function _getPage (lng: string){
    const { t } = await useServerTranslation(lng, 'news');
    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title: t("head-title"),
            description: t("head-description"),
            keywords: t("head-keywords")
        })
    });
}