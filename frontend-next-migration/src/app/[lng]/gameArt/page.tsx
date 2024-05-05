import { GameArtPage } from "@/preparedPages/GameArtPage";
import { useServerTranslation } from "@/shared/i18n";
import { Metadata } from "next";

type Props = {
    params: { lng: string }
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { t } = await useServerTranslation(params.lng, 'gameArt');

    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}


// export default async function GameArt({ params }: Props) {
//
//
//     return (
//         <GameArtPage lng={params.lng}
//         />
//     )
// }

export default GameArtPage;
