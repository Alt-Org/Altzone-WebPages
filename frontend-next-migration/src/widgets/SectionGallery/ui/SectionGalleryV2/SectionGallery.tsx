'use client';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ImageWall, ImageData, useGetStrapiGalleryImages } from '@/entities/Gallery';
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
    socialMediaLinks: string[];
    mockImages?: { [key: string]: ImageData }; // for Storybook
};

export const SectionGallery = (props: GalleryProps) => {
    const [images, setImages] = useState<{ [key: string]: ImageData }>({});
    const { version, seeMoreLink, mockImages } = props;

    useEffect(() => {
        if (mockImages) {
            setImages(mockImages); // Use mock images if provided (Storybook)
        } else {
            const filteredImages = useGetStrapiGalleryImages(
                require.context('/public/images/gallery', false, /\.(png|jpe?g|svg)$/),
                'public/images/gallery',
            );
            setImages(filteredImages);
        }
    }, [mockImages]);

    const imagesArray = Object.values(images);
    const previewCount = 8;
    const previewImages = imagesArray.slice(0, previewCount);

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView,
    };

    return (
        <div>
            {/*<EmbedSocialMediaPosts posts={socialMediaLinks} />*/}
            {version === 'full' ? (
                <ImageWall
                    // version={version}
                    images={imagesArray}
                />
            ) : (
                <>
                    <ImageWall
                        // version={version}
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
