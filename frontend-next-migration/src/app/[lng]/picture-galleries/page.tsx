import {default as PictureGalleriesPage } from "@/preparedPages/PictureGalleryPages";
import {Metadata} from "next";
import {useServerTranslation} from "@/shared/i18n";



type Props = {
    params: { lng: string }
}


export async function generateMetadata({ params }: Props): Promise<Metadata>  {

    const { t } = await useServerTranslation(params.lng, 'picture-galleries');

    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}

export default async function PictureGalleries({ params }: Props) {

    const { t } = await useServerTranslation(params.lng, 'picture-galleries');

    return (
        <>
            <PictureGalleriesPage
                title={t('picture-galleries')}
            />
        </>
)
}
