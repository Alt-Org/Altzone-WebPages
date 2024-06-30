import {Metadata} from "next";
import {useServerTranslation} from "@/shared/i18n";
import { HeroesPage } from "@/preparedPages/HeroesPages";

type Props = {
    params: { lng: string }
}


export async function generateMetadata({ params }: Props): Promise<Metadata>  {

    const { t } = await useServerTranslation(params.lng, 'heroes');

    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}


export default function (props: Props) {
    return (
          <HeroesPage/>
    )
}