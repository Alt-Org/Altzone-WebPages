import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { SocialIconLink } from '../types/types';
import Image from 'next/image';
import cls from './SocialSection.module.scss';

type SocialSectionVariant = 'header' | 'footer';

interface SocialSectionProps {
    className?: string;
    socialIconLinks: SocialIconLink[];
    variant?: SocialSectionVariant;
}

export const SocialSection = memo(
    ({ className = '', socialIconLinks, variant = 'footer' }: SocialSectionProps) => {
        return (
            <div
                className={classNames(cls.SocialSection, {}, [cls[variant], className])}
                data-testid="social-section"
            >
                {socialIconLinks.map((socialLink) => (
                    <AppLink
                        key={socialLink.link}
                        isExternal
                        theme={AppLinkTheme.PRIMARY}
                        to={socialLink.link}
                        className={cls.item}
                    >
                        <Image
                            src={socialLink.icon}
                            alt={socialLink.name}
                            width={35}
                            height={35}
                        />
                    </AppLink>
                ))}
            </div>
        );
    },
);

SocialSection.displayName = 'SocialSection';
