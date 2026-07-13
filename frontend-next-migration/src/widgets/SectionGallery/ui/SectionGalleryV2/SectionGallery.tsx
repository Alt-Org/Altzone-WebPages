'use client';
import { useInView } from 'react-intersection-observer';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import cls from './SectionGallery2.module.scss';
import Image from 'next/image';
import { SocialMediaIcons } from '@/shared/ui/SocialMediaIcons';
import { PhotoObject } from '@/entities/Gallery';

interface AnimationGalleryProps {
    animations: PhotoObject[];
    backgroundColor?: string;
}

export const AnimationGallerySection = ({ animations, backgroundColor }: AnimationGalleryProps) => {
    const { inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView,
    };

    return (
        <section
            className={cls.AnimationGallerySection}
            style={{ backgroundColor }}
        >
            {animations.map((set, index) => (
                <div
                    key={index}
                    className={cls.block}
                    id={set.anchorId}
                >
                    <div className={cls.textBlock}>
                        <h1 className={cls.title}>{set.title}</h1>
                        <p className={cls.author}>{set.author}</p>
                        <p className={cls.description}>{set.description}</p>
                    </div>
                    <div>
                        <SocialMediaIcons links={set.links} />
                    </div>
                    <div className={cls.framesContainer}>
                        <div className={cls.frameRow}>
                            {set.frames?.map((row, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className={cls.imageWrapper}
                                >
                                    <Image
                                        src={row[0]}
                                        alt={`Frame ${rowIndex}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className={cls.frameImage}
                                    />
                                </div>
                            ))}
                        </div>
                        {set.animation && (
                            <div className={cls.animationContainer}>
                                <Image
                                    src={set.animation ? set.animation[0] : ''}
                                    alt="Animation"
                                    width={720}
                                    height={472}
                                    className={cls.animationImage}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
};
