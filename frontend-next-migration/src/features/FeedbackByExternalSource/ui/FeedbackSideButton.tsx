'use client'
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import cls from "./FeedbackSideButton.module.scss"
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";
import {openLinkInNewTab} from "@/shared/lib/openLinkInNewTab/openLinkInNewTab";
import {useClientTranslation} from "@/shared/i18n";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";


type Props = {
    disableMobile?: boolean;
}

export const FeedbackSideButton = (props: Props) => {

    const {disableMobile= true} = props;

    const {t} = useClientTranslation("translation");

    const {isMobileSize} = useIsMobileSize();

    const handleClick = () => {
        openLinkInNewTab(AppExternalLinks.googleFeedback);
    }

    return (
        (!isMobileSize || !disableMobile) && (
            <Button
                theme={ButtonTheme.Graffiti}
                className={cls.SideButton}
                type="button"
                onClick={handleClick}
                disabled={isMobileSize && disableMobile}
            >
                {t("feedback")}
            </Button>
        )
    );
}