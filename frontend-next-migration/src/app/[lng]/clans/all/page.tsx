import {ClanAllSubPage as PreparedPage} from "@/preparedPages/ClanPages";
import {useServerTranslation} from "@/shared/i18n";
import {Metadata} from "next";


type Props = {
    params: { lng: string }
}


export default async function ClansAll() {
    return(
        <>
            <PreparedPage/>
        </>
    )
}

export async function generateMetadata({ params }: Props): Promise<Metadata>  {

    const { t } = await useServerTranslation(params.lng, 'clan');

    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}
