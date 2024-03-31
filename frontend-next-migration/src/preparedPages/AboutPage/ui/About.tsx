import {useServerTranslation} from "@/shared/i18n";

export default async function About({lng} : {lng: string}) {

    const { t } = await  useServerTranslation(lng, 'translation');

    return (
        <div>
            {
                t("title")
            }
        </div>
    )
}