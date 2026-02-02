/**
 * ProjectDescription renders the "What is the project?" section and its text content.
 *
 * @param showHeroImage - Optional. When true, renders the legacy hero image used earlier on the main page.
 * Defaults to false to prevent duplicate hero rendering, since the hero is handled elsewhere.
 */

'use client';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { classNames } from '@/shared/lib/classNames/classNames';
import greenHaired from '@/shared/assets/images/mainpage/topImage.png';
import { Container } from '@/shared/ui/Container';
import cls from './ProjectDescription.module.scss';
import { Paragraph } from '@/shared/ui/Paragraph';

export interface Props {
    className?: string;
    title: string;
    description: string;
    subDescription?: string;
    descriptionArray?: string[];
    showHeroImage?: boolean; // legacy/optional hero image (default: false)
}

export const ProjectDescription = (props: Props) => {
    const { description, title, subDescription, showHeroImage = false } = props;

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView,
    };

    return (
        <section
            ref={ref}
            className={classNames(cls.Section, mods)}
            id="description"
        >
            {showHeroImage && (
                <div className={cls.imgHolder}>
                    <Image
                        src={greenHaired}
                        priority
                        alt="description hero"
                        style={{ objectFit: 'cover' }}
                        className={classNames(cls.Image)}
                    />
                </div>
            )}

            <Container className={classNames(cls.Container, mods)}>
                <h2 className={cls.titleQuestion}>{title}</h2>

                <div className={classNames(cls.imageTextBlock, mods)}>
                    <Paragraph
                        className={cls.description}
                        text={description}
                    />
                </div>

                {subDescription && (
                    <div className={classNames(cls.subDescription, mods)}>
                        <Paragraph
                            className={cls.subDescription}
                            text={subDescription}
                        />
                    </div>
                )}
            </Container>
        </section>
    );
};
