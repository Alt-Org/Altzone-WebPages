'use client';
import { CTASection } from '@/shared/ui/CtaSection';
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

    return (
        <CTASection
            title={title}
            imageSrc={ContactImg}
            imageAlt="Side image with hero"
            imagePosition="right"
            links={links}
        />
    );
};
