import {createPage} from "@/app/_helpers";
import {DataPolicyPageProps} from "@/preparedPages/DataPolicyPage";
import {useServerTranslation} from "@/shared/i18n";

export async function _getPage (lng: string){
    // todo add it
    const { t } = await useServerTranslation(lng, 'data-policy');
    return createPage<DataPolicyPageProps>({
        //todo add translations!
        buildPage: () => ({
            title: "Data Policy",
            text: "Under GDPR, you have the following rights:\n" +
                "\n" +
                "Access to Data: You can request a copy of the personal data we hold about you.\n" +
                "Rectification: You can request the correction of inaccurate or incomplete data.\n" +
                "Erasure: You can request the deletion of your personal data (\"right to be forgotten\").\n" +
                "Restriction of Processing: You can request the restriction of processing your data in certain circumstances.\n" +
                "Data Portability: You can request that your personal data be provided to you or another data controller in a structured, commonly used, and machine-readable format.\n" +
                "Right to Object: You can object to the processing of your personal data, particularly if the processing is based on legitimate interest or for direct marketing purposes.\n" +
                "\n" +
                "You can exercise these rights by contacting us via email at proyaleg@gmail.com .\n" +
                "\n" +
                "If you believe your data has been processed unlawfully, you have the right to file a complaint with a supervisory authority.\n" +
                "\n" +
                "\n" +
                "We retain your personal data for as long as it is necessary to fulfill the purposes described above or until you request the deletion of your data. " +
                "You can request the deletion of your data at any time by sending an informal request via email to proyaleg@gmail.com. Upon such a request," +
                " all data related to you will be permanently and irrevocably deleted unless there is a legal requirement to retain the data."
        }),
        //todo add seo translations!
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        })
    });
}