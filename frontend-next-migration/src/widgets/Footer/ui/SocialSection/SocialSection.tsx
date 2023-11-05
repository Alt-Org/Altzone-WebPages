import {memo} from "react";
import {classNames} from "@/shared/lib/classNames/classNames";
import {AppLink, AppLinkTheme} from "@/shared/ui/AppLink/AppLink";
import cls from './SocialSection.module.scss'
import {SocialLink} from "../../model/types/types";


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
                    isExternal
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

SocialSection.displayName = "Footer-SocialSection";