'use client';
import { useInView } from 'react-intersection-observer';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import cls from './SectionGallery2.module.scss';
import Image from 'next/image';

interface FrameSet {
    title: string;
    author: string;
    description: string;
    frames: string[][]; // each row is an array of image paths
}

interface AnimationGalleryProps {
    animations: FrameSet[];
}

export const AnimationGallerySection = ({ animations }: AnimationGalleryProps) => {
    const { inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView,
    };

    return (
        <section className={cls.AnimationGallerySection}>
            {animations.map((set, index) => (
                <div
                    key={index}
                    className={cls.block}
                >
                    <div className={cls.textBlock}>
                        <h1 className={cls.title}>{set.title}</h1>
                        <p className={cls.author}>{set.author}</p>
                        <p className={cls.description}>{set.description}</p>
                    </div>
                    <div className={cls.framesContainer}>
                        {set.frames.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className={cls.frameRow}
                            >
                                {row.map((imgSrc, imgIndex) => (
                                    <div
                                        key={imgIndex}
                                        className={cls.imageWrapper}
                                    >
                                        <Image
                                            src={imgSrc}
                                            alt={`Frame ${imgIndex}`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className={cls.frameImage}
                                        />
                                    </div>
                                ))}
                                <div className={cls.buttonWrapper}>
                                    <Button
                                        theme={ButtonTheme.Graffiti}
                                        className={classNames(cls.animateButton, mods)}
                                    >
                                        Animation
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};
