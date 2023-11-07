// export {default} from "@/preparedPages/AboutPage";
import {useParams} from "next/navigation";
import {useServerTranslation} from "@/shared/i18n";


export async function generateMetadata({ params: { lng } }) {
    const { t } = await useServerTranslation(lng, 'translation')
    return { title: t('h1') }
}


export default async function About({ params: { lng } }) {


    console.log(lng);

    const { t } = await  useServerTranslation(lng, 'translation');

    return (
        <div>
            {
                t("title")
            }
        </div>
    )
}
