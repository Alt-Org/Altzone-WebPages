'use client'
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import cls from "./FeedbackSideButton.module.scss"
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";
import {openLinkInNewTab} from "@/shared/lib/openLinkInNewTab/openLinkInNewTab";
import {useClientTranslation} from "@/shared/i18n";
import {useParams} from "next/navigation";


export const FeedbackSideButton = () => {

    const params = useParams();
    const lng = params.lng as string;
    const {t} = useClientTranslation(lng, "translation");


    const handleClick = () => {
        openLinkInNewTab(AppExternalLinks.googleFeedback);
    }

    return (
        <Button theme={ButtonTheme.Graffiti} className={cls.SideButton} type='button' onClick={handleClick} >
            {
                t("feedback")
            }
        </Button>
    )
}