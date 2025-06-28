'use client';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { classNames } from '@/shared/lib/classNames/classNames';
<<<<<<< HEAD
import greenHaired from '@/shared/assets/images/mainpage/subway_WEBP.webp';
=======
import ahmatti from '@/shared/assets/images/heros/hannu-hodari/ahmatti_2_60.webp';
>>>>>>> 9d6d33321f6f167d7361365c31bf427d5ba25de5
import { Container } from '@/shared/ui/Container';
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
<<<<<<< HEAD
    const { description, title, subDescription } = props;
=======
    const { className = '', description, title } = props;
>>>>>>> 9d6d33321f6f167d7361365c31bf427d5ba25de5

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
            <div className={cls.imgHolder}>
                <Image
                    src={greenHaired}
                    alt={'description hero'}
                    style={{ objectFit: 'cover' }}
                    className={classNames(cls.Image)}
                />
            </div>
            <Container className={classNames(cls.Container, mods)}>
                <h2 className={cls.titleQuestion}>{title}</h2>
                <div className={classNames(cls.imageTextBlock, mods)}>
<<<<<<< HEAD
=======
                    {!isMobileSize && (
                        <Image
                            src={ahmatti}
                            alt={'description hero'}
                            className={classNames(cls.Image, mods)}
                            priority
                        />
                    )}

>>>>>>> 9d6d33321f6f167d7361365c31bf427d5ba25de5
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
