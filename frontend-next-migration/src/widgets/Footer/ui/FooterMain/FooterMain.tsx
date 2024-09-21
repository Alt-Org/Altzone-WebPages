import {useParams} from "next/navigation";
import FooterDesktop from "../FooterDesktop/FooterDesktop";
import {socialIconLinks} from "../../model/data/socialSectionMenu";
import {useClientTranslation} from "@/shared/i18n";
import {envHelper} from "@/shared/const/envHelper";

export const Footer = ()  => {
    const params = useParams();
    const lng = params.lng as string;
    const {t} = useClientTranslation(lng, "footer");

    return (
            <FooterDesktop
                title={
                    t("FooterTitle")
                }
                // todo probably it should be internalized as well
                texts={
                    {
                        currentYear: new Date().getFullYear(),
                        privacy: "Privacy",
                        cookies: "Cookies",
                        consent: "Consent",
                        companyName: envHelper.companyName
                    }
                }
                socialIconLinks={socialIconLinks}
            />
    )
}