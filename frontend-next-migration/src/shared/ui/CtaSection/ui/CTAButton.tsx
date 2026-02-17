'use client';
import { Button, ButtonTheme } from '@/shared/ui/v2/Button';
import { DiscordIcon } from './DiscordIcon';
import cls from './CTAButton.module.scss';

export type CTAButtonVariant = 'primary' | 'discord' | 'custom';

export type CTAButtonProps = {
    text: string;
    link: string;
    variant?: CTAButtonVariant;
    icon?: React.ReactNode;
    className?: string;
};

const getButtonVariant = (link: string): CTAButtonVariant => {
    if (link.includes('discord')) return 'discord';
    return 'primary';
};

export const CTAButton = (props: CTAButtonProps) => {
    const { text, link, variant, icon, className = '' } = props;

    const buttonVariant = variant ?? getButtonVariant(link);
    const isDiscord = buttonVariant === 'discord';

    return (
        <Button
            path={link}
            isExternal={true}
            theme={isDiscord ? ButtonTheme.OUTLINE : ButtonTheme.PRIMARY}
            className={`${isDiscord ? cls.DiscordButton : cls.LinkButton} ${className}`}
        >
            <span className={cls.LinkText}>{text}</span>
            {isDiscord && (icon ?? <DiscordIcon className={cls.LinkIcon} />)}
        </Button>
    );
};
