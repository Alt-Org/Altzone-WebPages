import {createPage} from "@/app/_helpers";
import {PrivacyPageProps} from "@/preparedPages/PrivacyPage";
import {makePrivacySectionsWithI18n} from "@/entities/PresentationPackages";
import {useServerTranslation} from "@/shared/i18n";

export async function _getPage (lng: string){
    const { t } = await useServerTranslation(lng, 'privacy');

    return createPage<PrivacyPageProps>({
        buildPage: () => ({
            sections: makePrivacySectionsWithI18n(t)
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        })
    });
}