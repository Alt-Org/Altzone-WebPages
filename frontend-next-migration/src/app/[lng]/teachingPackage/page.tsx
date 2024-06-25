import { TeachingPackagePage } from "@/preparedPages/TeachingPackagePage";
import { useServerTranslation } from "@/shared/i18n";
import { Metadata } from "next";

type Props = {
    params: { lng: string }
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { t } = await useServerTranslation(params.lng, 'teachingPackage');

    console.log()

    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}

export default async function DefaultPage({ params }: Props){

    return(
                // @ts-ignore
                <TeachingPackagePage lng={params.lng}  />
            )
};