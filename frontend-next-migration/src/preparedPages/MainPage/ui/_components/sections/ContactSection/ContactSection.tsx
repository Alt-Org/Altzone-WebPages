'use client';
import { CTASection, CTAButton } from '@/shared/ui/CtaSection';
import ContactImg from '@/shared/assets/images/Orang_hero.webp';

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
            {links.map((link, index) => (
                <CTAButton
                    key={index}
                    text={link.text}
                    link={link.link}
                />
            ))}
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
