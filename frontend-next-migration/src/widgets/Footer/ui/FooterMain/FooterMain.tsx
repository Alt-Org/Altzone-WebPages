import FooterDesktop from "../FooterDesktop/FooterDesktop";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";


export const Footer = ()  => {

    const {isMobileSize} = useIsMobileSize()

    return (
            <FooterDesktop/>
    )
}