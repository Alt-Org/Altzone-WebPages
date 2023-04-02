import cls from './SocialSection.module.scss'
import {classNames} from "@/shared/lib/classNames/classNames";
import {AppLink, AppLinkTheme} from "@/shared/ui/AppLink/AppLink";
import {SocialLink} from "../../model/types/types";
import {memo} from "react";

interface SocialSectionProps{
    className?: string;
    socialLinks: SocialLink[];
}

export const SocialSection = memo(({className='',socialLinks}: SocialSectionProps) => {
    return (
        <div className={classNames(cls.SocialSection, {}, [className])}>
            {socialLinks.map((socialLink) => (
                <AppLink
                    key={socialLink.link}
                    external
                    theme={AppLinkTheme.PRIMARY}
                    to={socialLink.link}
                    className={classNames(cls.item)}
                >
                    {socialLink.icon}
                </AppLink>
            ))}
        </div>
    );
});
