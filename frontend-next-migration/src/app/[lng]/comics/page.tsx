import {ComicsGalleriesPage} from "@/preparedPages/ComicsGalleriesPages"

type Props = {
    params: { lng: string }
}

export default async function About({ params }: Props) {

    return (
        <>
            <ComicsGalleriesPage lng={params.lng}/>
        </>
    )
}
