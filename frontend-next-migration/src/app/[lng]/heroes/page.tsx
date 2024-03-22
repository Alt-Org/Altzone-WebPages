import HeroPage from "@/preparedPages/HeroesPage/HeroesPage";
import {Metadata} from "next";
import {useServerTranslation} from "@/shared/i18n";

type Props = {
    params: { lng: string }
    selectedHero: number;
}


export async function generateMetadata({ params }: Props): Promise<Metadata>  {

    const { t } = await useServerTranslation(params.lng, 'comics');

    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}


export default function HeroesPage(props: Props) {
    const {
        selectedHero
    } = props;

    return (
        <>
            <HeroPage
                selectedHero={selectedHero}
            />
        </>
    )
}