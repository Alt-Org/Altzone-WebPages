import {memo} from "react";
import {classNames} from "@/shared/lib/classNames/classNames";
import {AppLink, AppLinkTheme} from "@/shared/ui/AppLink/AppLink";
import cls from './SocialSection.module.scss'
import {SocialIconLink} from "../../model/types/types";
import Image from "next/image";


interface SocialSectionProps{
    className?: string;
    socialIconLinks: SocialIconLink[];
}

export const SocialSection = memo(({className='',socialIconLinks}: SocialSectionProps) => {
    return (
        <div className={classNames(cls.SocialSection, {}, [className])}>
            {socialIconLinks.map((socialLink) => (
                <AppLink
                    key={socialLink.link}
                    isExternal
                    theme={AppLinkTheme.PRIMARY}
                    to={socialLink.link}
                    className={classNames(cls.item)}
                >
                    <Image src={socialLink.icon} alt={socialLink.name}/>
                </AppLink>
            ))}
        </div>
    );
});

SocialSection.displayName = "Footer-SocialSection";


