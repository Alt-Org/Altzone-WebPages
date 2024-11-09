'use client';
import cls from './ImageWall.module.scss';
import Image from 'next/image';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { useInView } from 'react-intersection-observer';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ImageData } from '../../types/gallery';
import Fancybox from '@/shared/ui/Fancybox/Fancybox';
import React from 'react';
import { Border } from '../Border/Border';
import { MasonryWrapper } from '@/shared/ui/MasonryWrapper';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

export type ImageWallProps = {
    version: 'full' | 'preview';
    images: { [key: string]: ImageData };
    seeMoreLink?: {
        href: string;
        text: string;
    };
};

export const ImageWall = (props: ImageWallProps) => {
    const { version, images, seeMoreLink } = props;

    if (version === 'full') {
        return (
            <Fancybox>
                <MasonryWrapper>
                    {Object.keys(images).map((key: string) => (
                        <Border key={key}>
                            <div className={cls.Item}>
                                <AppLink
                                    to={images[key].src}
                                    data-fancybox="gallery"
                                    className={cls.DataFancybox}
                                >
                                    <Image
                                        className={cls.Image}
                                        src={images[key].src}
                                        alt={`Image ${key}`}
                                        priority={true}
                                        width={images[key].width}
                                        height={images[key].height}
                                    />
                                </AppLink>
                            </div>
                        </Border>
                    ))}
                </MasonryWrapper>
            </Fancybox>
        );
    } else if (version === 'preview' && seeMoreLink) {
        return (
            <div>
                <Fancybox>
                    <MasonryWrapper>
                        {Object.keys(images)
                            .slice(0, 8)
                            .map((key: string) => (
                                <Border key={key}>
                                    <div className={cls.Item}>
                                        <AppLink
                                            data-fancybox="gallery"
                                            to={images[key].src}
                                        >
                                            <Image
                                                className={cls.Image}
                                                src={images[key].src}
                                                alt={`Image ${key}`}
                                                width={images[key].width}
                                                height={images[key].height}
                                            />
                                        </AppLink>
                                    </div>
                                </Border>
                            ))}
                    </MasonryWrapper>
                </Fancybox>
            </div>
        );
    }
};
