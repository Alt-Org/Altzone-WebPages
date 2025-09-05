'use client';
import { useInView } from 'react-intersection-observer';
import { ImageWall } from '@/entities/Gallery/ui/ImageWall/ImageWall';
import type { PhotoObject } from '@/entities/Gallery';
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

    const imagesArray: PhotoObject[] = images ?? [];
    const previewImages: PhotoObject[] = imagesArray.slice(0, 8);

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = { [cls.inView]: inView };

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
                            withScalableLink
                            theme={ButtonTheme.Graffiti}
                            className={classNames(cls.SeeMore, mods)}
                            size={ButtonSize.XL}
                        >
                            <AppLink to={seeMoreLink.href}>{seeMoreLink.text}</AppLink>
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SectionGallery;
