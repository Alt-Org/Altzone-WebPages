'use client';
import { CTASection } from '@/shared/ui/CtaSection';
import { Button, ButtonTheme } from '@/shared/ui/v2/Button';
import Image from 'next/image';
import DiscordIcon from '@/shared/assets/images/Discord2.svg';
import ContactImg from '@/shared/assets/images/Orang_hero.webp';
import cls from './ContactSection.module.scss';

export type ContactLink = {
    text: string;
    link: string;
};

export type ContactSectionProps = {
    title: string;
    links: ContactLink[];
};

export const ContactSection = (props: ContactSectionProps) => {
    const { title, links } = props;

    const actions = (
        <>
            {links.map((link, index) => {
                const isDiscord = link.link.includes('discord');
                return (
                    <Button
                        key={index}
                        path={link.link}
                        isExternal={true}
                        theme={isDiscord ? ButtonTheme.OUTLINE : ButtonTheme.PRIMARY}
                    >
                        {link.text}
                        {isDiscord && (
                            <Image
                                src={DiscordIcon}
                                alt="Discord"
                                className={cls.DiscordIcon}
                            />
                        )}
                    </Button>
                );
            })}
        </>
    );

    return (
        <CTASection
            title={title}
            imageSrc={ContactImg}
            imagePosition="right"
            actions={actions}
        />
    );
};
