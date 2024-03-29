import { useServerTranslation} from "@/shared/i18n";
import {Metadata} from "next";

type Props = {
    params: { lng: string }
}

// eslint-disable-line react-hooks/rules-of-hooks
export async function generateMetadata({ params }: Props): Promise<Metadata>  {

    // eslint-disable-line react-hooks/rules-of-hooks
    const { t } = await useServerTranslation(params.lng, 'about');

    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}


export default async function About({ params }: Props) {

    const { t } = await useServerTranslation(params.lng, 'about');

    return (
            <main>
                <h1>
                    {
                        t("title")
                    }
                </h1>
            </main>
    )
}
