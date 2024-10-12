import {useServerTranslation} from "@/shared/i18n";
import {createPage} from "@/app/_helpers";
import {AboutPageProps} from "@/preparedPages/AboutPage";

export async function _getPage (lng: string){
    const {t} = await useServerTranslation(lng, 'about');
    return createPage<AboutPageProps>({
        buildPage: () => ({
            title: t("title")
        }),
        buildSeo: () => ({
            title: t("head-title"),
            description: t("head-description"),
            keywords: t("head-keywords"),
        })
    });
}