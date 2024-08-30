import {ComicsGalleriesPage} from "@/preparedPages/ComicsGalleriesPages"
import {Metadata} from "next";
import {useServerTranslation} from "@/shared/i18n";
import {_getPage} from "./_getPage";

type Props = {
    params: { lng: string }
}


export async function generateMetadata({ params }: Props): Promise<Metadata>  {
    return await _getPage(params.lng).then(r => r.seo);
}


export default async function Comics({ params }: Props) {
    const {t} = await useServerTranslation(params.lng, "comics");

    return (
        <>
            <ComicsGalleriesPage
                title={t('Comics')}
            />
        </>
    )
}
