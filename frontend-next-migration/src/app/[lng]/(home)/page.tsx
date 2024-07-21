import {MainPage as PreparedPage} from "@/preparedPages/MainPage";
import {Metadata} from "next";
import {_getPage} from "./_getPage";

type Props = {
    params: { lng: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata>  {
    return await _getPage(params.lng).then(r => r.seo);
}

export default async function MainPage({params}: Props) {
    const {page} = await  _getPage(params.lng);

    return (
            <PreparedPage
                {...page}
            />
    );

}