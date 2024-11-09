'use client';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { classNames } from '@/shared/lib/classNames/classNames';
import greenHaired from '@/shared/assets/images/heros/hannu-hodari/ahmatti_2_60.webp';
import { Container } from '@/shared/ui/Container';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import { Paragraph } from '@/shared/ui/Paragraph';
import cls from './ProjectDescription.module.scss';

export interface Props {
    className?: string;
    title: string;
    description: string;
}

export const ProjectDescription = (props: Props) => {
    const { className = '', description, title } = props;

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView,
    };

    const { isMobileSize } = useIsMobileSize();

    return (
        <section
            ref={ref}
            className={classNames(cls.Section, mods, [className])}
            id="description"
        >
            <Container className={classNames(cls.Container, mods)}>
                <h2 className={cls.titleQuestion}>{title}</h2>
                <div className={classNames(cls.imageTextBlock, mods)}>
                    {!isMobileSize && (
                        <Image
                            src={greenHaired}
                            alt={'description hero'}
                            className={classNames(cls.Image, mods)}
                        />
                    )}
                    <Paragraph
                        className={cls.description}
                        text={description}
                    />
                </div>
            </Container>
        </section>
    );
};
