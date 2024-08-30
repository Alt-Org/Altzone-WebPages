import {ComicsGalleriesPage} from "@/preparedPages/ComicsGalleriesPages"
import {Metadata} from "next";
import {useServerTranslation} from "@/shared/i18n";

type Props = {
    params: { lng: string }
}


export async function generateMetadata({ params }: Props): Promise<Metadata>  {

    const { t } = await useServerTranslation(params.lng, 'comics');

    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}


export default async function Comics({ params }: Props) {




    return (
        <>
            <ComicsGalleriesPage lng={params.lng}/>
        </>
    )
}
