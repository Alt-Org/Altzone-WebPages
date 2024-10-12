import {createPage} from "@/app/_helpers/_createPage";
import {ProfilePageProps} from "@/preparedPages/ProfilePage";
import {useServerTranslation} from "@/shared/i18n";

export async function _getPage(lng: string){
    const { t } = await useServerTranslation(lng, 'members');
    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title: t("head-title"),
            description: t("head-description"),
            keywords: t("head-keywords"),
        })
    });
}
