import {default as PreparedPage} from "@/preparedPages/PrivacyPage";
import {Metadata} from "next";
import {useServerTranslation} from "@/shared/i18n";


type Props = {
    params: { lng: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata>  {

    const { t } = await useServerTranslation(params.lng, 'privacy');

    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}


export default function PrivacyPage(){

    return (
        <>
        <PreparedPage/>
        </>
)
}