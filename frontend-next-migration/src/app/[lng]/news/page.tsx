import {NewsPage as PreparedPage} from "@/preparedPages/NewsPages";
import {Metadata} from "next";
import {useServerTranslation} from "@/shared/i18n";

type Props = {
    params: { lng: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata>  {

    const { t } = await useServerTranslation(params.lng, 'news');

    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}


export default function NewsPage(){

    return (
        <>
            <PreparedPage/>
        </>
    )
}