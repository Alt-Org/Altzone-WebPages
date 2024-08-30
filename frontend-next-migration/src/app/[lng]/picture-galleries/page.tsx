import {Metadata} from "next";
import {default as PictureGalleriesPage } from "@/preparedPages/PictureGalleryPages";
import {_getPage} from "./_getPage";

type Props = {
    params: { lng: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata>  {
    return await _getPage(params.lng).then(r => r.seo);
}

export default async function PictureGalleries({ params }: Props) {

    const {page} = await _getPage(params.lng);

    return (
        <>
            <PictureGalleriesPage
                {...page}
            />
        </>
)
}
