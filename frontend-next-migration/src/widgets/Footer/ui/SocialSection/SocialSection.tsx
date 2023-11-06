import {memo} from "react";
import {classNames} from "@/shared/lib/classNames/classNames";
import {AppLink, AppLinkTheme} from "@/shared/ui/AppLink/AppLink";
import cls from './SocialSection.module.scss'
import {SocialLink} from "../../model/types/types";
import Image from "next/image";


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
                    {/*{socialLink.icon}*/}
                    <Image src={socialLink.icon} alt={socialLink.name}/>
                </AppLink>
            ))}
        </div>
    );
});

SocialSection.displayName = "Footer-SocialSection";


