import {useServerTranslation} from "@/shared/i18n";

type Props = {
    params: { lng: string }
}

export async function generateMetadata({ params } : Props) {
    const { t } = await useServerTranslation(params.lng, 'translation')
    return { title: t('h1') }
}


export default async function About({ params }: Props) {

    const { t } = await  useServerTranslation(params.lng, 'translation');

    return (
        <div>
            {
                t("title")
            }
        </div>
    )
}
