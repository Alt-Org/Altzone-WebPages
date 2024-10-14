import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";
import cls from "./GamePage.module.scss"

export default function GamePage () {
    return (
            <iframe
                scrolling={"no"}
                className={cls.Iframe}
                width="100%"
                height="100%"
                src={AppExternalLinks.webgl}
                // allowFullScreen
            />
    )
}