// import '../../preparedApp/styles/index.scss'
import {MainPage as PreparedPage} from "@/preparedPages/MainPage";
import {useServerTranslation} from "@/shared/i18n";
import {Metadata} from "next";

type Props = {
    params: { lng: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata>  {

    const { t } = await useServerTranslation(params.lng, 'main');
    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}

export default async function MainPage({ params }: Props){


    const { t } = await useServerTranslation(params.lng, 'main');

    return (
        <>
            <PreparedPage
                projectDescription={{
                    title: t('project-description-title'),
                    description: t('project-description-text')
            }}
                t={t}
            />
        </>
    )
}