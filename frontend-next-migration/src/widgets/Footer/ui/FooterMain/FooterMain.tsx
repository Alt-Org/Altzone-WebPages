import FooterDesktop from "../FooterDesktop/FooterDesktop";
import {socialIconLinks} from "../../model/data/socialSectionMenu";
import {useClientTranslation} from "@/shared/i18n";
import {envHelper} from "@/shared/const/envHelper";

export const Footer = ()  => {
    const {t} = useClientTranslation("footer");

    return (
            <FooterDesktop
                title={
                    t("FooterTitle")
                }
                // todo probably it should be internalized as well
                texts={
                    {
                        currentYear: new Date().getFullYear(),
                        privacy: t("FooterPrivacy"),
                        cookies: t("FooterCookies"),
                        consent: t("FooterConsent"),
                        companyName: envHelper.companyName
                    }
                }
                socialIconLinks={socialIconLinks}
            />
    )
}