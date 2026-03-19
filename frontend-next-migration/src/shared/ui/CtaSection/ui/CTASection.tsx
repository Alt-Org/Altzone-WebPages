'use client';
import { ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import cls from './CTASection.module.scss';

/**
 * Props for the CTASection component.
 */
export type CTASectionProps = {
    /** Main heading text */
    title: string;
    /** Optional content below the title */
    description?: ReactNode;
    /** Additional content rendered after description */
    extraText?: ReactNode;
    /** Alt text for the image (for accessibility) */
    imageAlt?: string;
    /** Image source (imported or URL) */
    imageSrc: StaticImageData | string;
    /** @default 'right' */
    imagePosition?: 'left' | 'right';
    /** Action buttons or links */
    actions?: ReactNode;
    className?: string;
    /** Button layout on mobile screens @default 'column' */
    mobileButtonLayout?: 'column' | 'row';
};

/**
 * Call-to-action section with image and optional actions.
 *
 * @example
 * ```tsx
 *
 * <CTASection
 *   title="CTA"
 *   description="Call to Action"
 *   imageSrc={heroImage}
 *   imageAlt="Hero illustration"
 *   imagePosition="left"
 *   actions={<Button>CTA section</Button>}
 * />
 * ```
 */
export const CTASection = (props: CTASectionProps) => {
    const {
        title,
        description,
        extraText,
        imageSrc = '',
        imageAlt,
        imagePosition = 'right',
        actions,
        className = '',
        mobileButtonLayout = 'column',
    } = props;

    const mods: Record<string, boolean> = {
        [cls.imageLeft]: imagePosition === 'left',
        [cls.mobileRow]: mobileButtonLayout === 'row',
    };

    return (
        <section className={classNames(cls.CTASection, mods, [className])}>
            <Container className={cls.Container}>
                <div className={cls.Content}>
                    <div className={cls.TextBlock}>
                        <h2 className={cls.Title}>{title}</h2>
                        {description && <div className={cls.Description}>{description}</div>}
                        {extraText && <div className={cls.ExtraText}>{extraText}</div>}
                        {actions && <div className={cls.ButtonsWrapper}>{actions}</div>}
                    </div>
                    <div className={cls.ImageBlock}>
                        <Image
                            src={imageSrc}
                            alt={imageAlt ?? ''}
                            className={cls.Image}
                            priority={false}
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};
