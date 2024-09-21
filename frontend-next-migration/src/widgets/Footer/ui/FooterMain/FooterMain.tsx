import {useParams} from "next/navigation";
import FooterDesktop from "../FooterDesktop/FooterDesktop";
import {socialIconLinks} from "../../model/data/socialSectionMenu";
import {useClientTranslation} from "@/shared/i18n";


export const Footer = ()  => {

    const params = useParams();
    const lng = params.lng as string;
    const {t} = useClientTranslation(lng, "footer");

    return (
            <FooterDesktop
                title={
                    t("FooterTitle")
                }
                texts={
                    {

                    }
                }
                socialIconLinks={socialIconLinks}
            />
    )
}