import {createPage} from "@/app/_helpers";
import {PictureGalleryPageProps} from "@/preparedPages/PictureGalleryPages";
import {useServerTranslation} from "@/shared/i18n";

export async function _getPage (lng: string){
    const {t} = await useServerTranslation(lng, 'picture-galleries');
    return createPage<PictureGalleryPageProps>({
        buildPage: () => ({
            title: t("picture-galleries")
        }),
        buildSeo: () => ({
            title: t("head-title"),
            description: t("head-description"),
            keywords: t("head-keywords"),
        })
    });
}