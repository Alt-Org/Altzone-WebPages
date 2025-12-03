'use client';
import Image from 'next/image';
import cls from './ContactSection.module.scss';
import { Container } from '@/shared/ui/Container';
import ContactImg from '@/shared/assets/images/Orang_hero.webp';

export type Props = {
    title: string;
    backgroundImageSrc?: string;
    googlePLayLink?: string;
    linkText?: string;
};

export const ContactSection = (props: Props) => {
    const { googlePLayLink, linkText, title } = props;
    return (
        <Container
            as={'section'}
            className={cls.SectionPlayWithUs}
            fluid={true}
        >
            <div className={cls.Content}>
                <Image
                    src={ContactImg}
                    alt={'Side image with hero'}
                    priority={true}
                    className={cls.sideImg}
                />
                <div className={cls.ContentWithNav}>
                    <h2 className={cls.title}>{title}</h2>
                    <a
                        className={cls.Link}
                        href={googlePLayLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {linkText}
                    </a>
                </div>
            </div>
        </Container>
    );
};
