'use client';
import { ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import { CTAButton } from './CTAButton';
import cls from './CTASection.module.scss';

export type CTALink = {
    text: string;
    link: string;
};

export type Props = {
    title: string;
    description?: ReactNode;
    extraText?: ReactNode;
    imageSrc: StaticImageData | string;
    imageAlt?: string;
    imagePosition?: 'left' | 'right';
    actions?: ReactNode;
    className?: string;
    links?: CTALink[];
    mobileButtonLayout?: 'column' | 'row';
};

export const CTASection = (props: Props) => {
    const {
        title,
        description,
        extraText,
        imageSrc,
        imageAlt = '',
        imagePosition = 'right',
        actions,
        className = '',
        links = [],
        mobileButtonLayout = 'column',
    } = props;

    const mods: Record<string, boolean> = {
        [cls.imageLeft]: imagePosition === 'left',
        [cls.mobileRow]: mobileButtonLayout === 'row',
    };

    const hasButtons = links.length > 0 || actions;

    return (
        <section className={classNames(cls.CTASection, mods, [className])}>
            <Container className={cls.Container}>
                <div className={cls.Content}>
                    <div className={cls.TextBlock}>
                        <h2 className={cls.Title}>{title}</h2>
                        {description && <div className={cls.Description}>{description}</div>}
                        {extraText && <div className={cls.ExtraText}>{extraText}</div>}
                        {hasButtons && (
                            <div className={cls.ButtonsWrapper}>
                                {actions}
                                {links.map((item, index) => (
                                    <CTAButton
                                        key={index}
                                        text={item.text}
                                        link={item.link}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={cls.ImageBlock}>
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            className={cls.Image}
                            priority={false}
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};
