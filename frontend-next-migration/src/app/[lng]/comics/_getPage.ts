import {createPage} from "@/app/_helpers";
import {ComicsGalleriesPageProps} from "@/preparedPages/ComicsGalleriesPages";
import {useServerTranslation} from "@/shared/i18n";

export async function _getPage (lng: string){
    const {t} = await useServerTranslation(lng, 'comics');
    return createPage<ComicsGalleriesPageProps>({
        buildPage: () => ({
            title: t("Comics")
        }),
        buildSeo: () => ({
            title: t("head-title"),
            description: t("head-description"),
            keywords: t("head-keywords"),
        })
    });
}