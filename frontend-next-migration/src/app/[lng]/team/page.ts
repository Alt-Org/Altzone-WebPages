import {Metadata} from "next";
import {useServerTranslation} from "@/shared/i18n";
export {default} from "@/preparedPages/MembersPage";

type Props = {
    params: { lng: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata>  {

    const { t } = await useServerTranslation(params.lng, 'members');

    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}