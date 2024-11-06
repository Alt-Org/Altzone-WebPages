import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { SocialIconLink } from '../../model/types/types';
import Image from 'next/image';
import cls from './SocialSection.module.scss';

interface SocialSectionProps {
    className?: string;
    socialIconLinks: SocialIconLink[];
}

export const SocialSection = memo(({ className = '', socialIconLinks }: SocialSectionProps) => {
    return (
        <div
            className={classNames(cls.SocialSection, {}, [className])}
            data-testid="social-section"
        >
            {socialIconLinks.map((socialLink) => {
                const Icon = socialLink.icon;

                return (
                    <AppLink
                        key={socialLink.link}
                        isExternal
                        theme={AppLinkTheme.PRIMARY}
                        to={socialLink.link}
                        className={classNames(cls.item)}
                    >
                        {typeof Icon === 'string' ? (
                            <Image
                                src={Icon}
                                alt={socialLink.name}
                                width={24}
                                height={24}
                            />
                        ) : (
                            <Icon aria-label={socialLink.name} />
                        )}
                    </AppLink>
                );
            })}
        </div>
    );
});

SocialSection.displayName = 'Footer-SocialSection';
