'use client';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { classNames } from '@/shared/lib/classNames/classNames';
import greenHaired from '@/shared/assets/images/mainpage/subway_WEBP.webp';
import { Container } from '@/shared/ui/Container';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import cls from './ProjectDescription.module.scss';
import { Paragraph } from '@/shared/ui/Paragraph';

export interface Props {
    className?: string;
    title: string;
    description: string;
    subDescription?: string;
    descriptionArray?: string[];
}

export const ProjectDescription = (props: Props) => {
    const { description, title, subDescription } = props;

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
            className={classNames(cls.Section, mods)}
            id="description"
        >
            <Container className={classNames(cls.Container, mods)}>

                   <Image
                        src={greenHaired}
                        alt={'description hero'}
                        style={{ objectFit: 'cover' }}
                        className={classNames(cls.Image)}
                    />
                

                <h2 className={cls.titleQuestion}>{title}</h2>
                <div className={classNames(cls.imageTextBlock, mods)}>
                    <Paragraph
                        className={cls.description}
                        text={description}
                    />
                </div>
                <div className={classNames(cls.subDescription, mods)}>
                    <Paragraph
                        className={cls.subDescription}
                        text={subDescription}
                    />
                </div>
            </Container>
        </section>
    );
};
