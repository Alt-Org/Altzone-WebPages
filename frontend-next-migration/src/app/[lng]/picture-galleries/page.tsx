import {default as PictureGalleriesPage } from "@/preparedPages/PictureGalleryPages";



type Props = {
    params: { lng: string }
}

export default async function About({ params }: Props) {

    return (
        <>
            <PictureGalleriesPage lng={params.lng}/>
    </>
)
}
