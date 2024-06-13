import {AuthSubRegisterPage as PreparedPage} from "@/preparedPages/AuthPages";
import {Metadata} from "next";
import {useServerTranslation} from "@/shared/i18n";


type Props = {
    params: { lng: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata>  {

    const { t } = await useServerTranslation(params.lng, 'auth');

    return {
        title: t("auth-register-head-title"),
        description: t("auth-register-head-description"),
        keywords: t("auth-register-head-keywords"),
    }
}


export default async function AuthSubRegisterPage() {
    return (
        <>
            <PreparedPage/>
        </>
    )
}