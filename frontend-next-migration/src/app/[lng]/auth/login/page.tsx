import {AuthSubLoginPage as PreparedPage} from "@/preparedPages/AuthPages";
import {Metadata} from "next";
import {useServerTranslation} from "@/shared/i18n";

type Props = {
    params: { lng: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata>  {

    const { t } = await useServerTranslation(params.lng, 'auth');

    return {
        title: t("auth-login-head-title"),
        description: t("auth-login-head-description"),
        keywords: t("auth-login-head-keywords"),
    }
}

export default async function AuthSubLoginPage() {
    return (
        <>
            <PreparedPage/>
        </>
    )
}

