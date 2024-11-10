'use client';
import cls from './ImageWall.module.scss';
import Image from 'next/image';
import { ImageData } from '../../types/gallery';
import Fancybox from '@/shared/ui/Fancybox/Fancybox';
import { Border } from '../Border/Border';
import { MasonryWrapper } from '@/shared/ui/MasonryWrapper';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

export type ImageWallProps = {
    images: ImageData[];
};

export const ImageWall = ({ images }: ImageWallProps) => {
    return (
        <Fancybox>
            <MasonryWrapper>
                {images.map((image, index) => (
                    <Border key={index}>
                        <div className={cls.Item}>
                            <AppLink
                                data-fancybox="gallery"
                                to={image.src}
                                className={cls.DataFancybox}
                            >
                                <Image
                                    className={cls.Image}
                                    src={image.src}
                                    alt={`Image ${index}`}
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
