'use client';
import cls from './ImageWall.module.scss';
import Image from 'next/image';
import { PhotoObject, PhotoVersion, filterAndTransformImages } from '@/entities/Gallery';
import Fancybox from '@/shared/ui/Fancybox/Fancybox';
import { Border } from '../Border/Border';
import { MasonryWrapper } from '@/shared/ui/MasonryWrapper';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { useEffect, useState } from 'react';

export type ImageWallProps = {
    images: PhotoObject[];
    version: string;
};

export const ImageWall = ({ images, version }: ImageWallProps) => {
    const [filteredImages, setFilteredImages] = useState<PhotoVersion[]>([]);

    useEffect(() => {
        const filteredImages = filterAndTransformImages(images, version);
        if (filteredImages) setFilteredImages(filteredImages);
    }, [images]);

    return (
        <Fancybox>
            <MasonryWrapper>
                {filteredImages.map((image, index) => (
                    <Border key={index}>
                        <div className={cls.Item}>
                            <AppLink
                                data-fancybox="gallery"
                                to={image.image}
                                className={cls.DataFancybox}
                            >
                                <Image
                                    className={cls.Image}
                                    src={image.image}
                                    alt={image.altText}
                                    width={image.width}
                                    height={image.height}
                                />
                            </AppLink>
                        </div>
                    </Border>
                ))}
            </MasonryWrapper>
        </Fancybox>
    );
};
