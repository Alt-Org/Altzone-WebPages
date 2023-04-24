import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import cls from "@/features/FeedbackByGoogleForms/ui/FeedbackSideButton.module.scss"
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";
import {openLinkInNewTab} from "@/shared/lib/openLinkInNewTab/openLinkInNewTab";

export const FeedbackSideButton = () => {

    const handleClick = () => {
        openLinkInNewTab(AppExternalLinks.googleFeedback);
    }

    return (
        <Button theme={ButtonTheme.Graffiti} className={cls.SideButton} type='button'onClick={handleClick} >
                Palaute
        </Button>
    )
}