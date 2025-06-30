/*  'use client';
import { useInView } from 'react-intersection-observer';
import { ImageWall, PhotoObject } from '@/entities/Gallery';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import cls from './SectionGallery2.module.scss';

interface PreviewProps {
    version: 'preview';
    seeMoreLink: {
        text: string;
        href: string;
    };
    videoLink?: string;
}

interface FullProps {
    version: 'full';
    seeMoreLink?: never;
}

type GalleryProps = (PreviewProps | FullProps) & {
    images: PhotoObject[];
    socialMediaLinks: string[];
};

export const SectionGallery = (props: GalleryProps) => {
    const { version, seeMoreLink, images } = props;

    let imagesArray: PhotoObject[] = [];
    let previewImages: PhotoObject[] = [];

    if (images) {
        imagesArray = Object.values(images);
        const previewCount = 8;
        previewImages = imagesArray.slice(0, previewCount);
    }

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView,
    };

    return (
        <div>
            {version === 'full' ? (
                <ImageWall
                    version={version}
                    images={imagesArray}
                />
            ) : (
                <>
                    <ImageWall
                        version={version}
                        images={previewImages}
                    />
                    <div
                        ref={ref}
                        className={cls.buttonContainer}
                    >
                        <Button
                            withScalableLink={true}
                            theme={ButtonTheme.Graffiti}
                            className={classNames(cls.SeeMore, mods)}
                            size={ButtonSize.XL}
                            ref={ref}
                        >
                            <AppLink to={seeMoreLink.href}>{seeMoreLink.text}</AppLink>
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};
 */
'use client';

import { useInView } from 'react-intersection-observer';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import cls from './SectionGallery2.module.scss';
import Image from 'next/image';

interface FrameSet {
    title: string;
    description: string;
    frames: string[][]; // each row is an array of image paths
}

interface AnimationGalleryProps {
    animations: FrameSet[];
}

export const AnimationGallerySection = ({ animations }: AnimationGalleryProps) => {
    const { ref, inView } = useInView({
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
                                            width={100}
                                            height={100}
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
