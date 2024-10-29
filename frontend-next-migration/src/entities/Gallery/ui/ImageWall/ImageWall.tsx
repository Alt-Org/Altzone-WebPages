'use client'; 
import cls from "./ImageWall.module.scss"
import Image from "next/image";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button";
import {useInView} from "react-intersection-observer";
import {classNames} from "@/shared/lib/classNames/classNames";
import Link from "next/link";
import { Version } from "../../types/gallery";
import Fancybox from "@/shared/ui/Fancybox/Fancybox";
import { ImageData } from "../../types/gallery";
import React from "react";
import { Border } from "../Border/Border";

export type ImageWallProps = {
    version: Version
    images: { [key: string]: ImageData }
    seeMoreLink?: {
        href: string,
        text: string,
    }
}

export const ImageWall = (props: ImageWallProps) => {
    const { version, images, seeMoreLink } = props

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView
    }

    const borderImageSrc = "/images/hero-border3.png"

    if (version === "full") {
        return (
            <Fancybox>
                <div className={cls.Container}>
                    {Object.keys(images).map((key: string) => (
                        <Border 
                            key={key}
                            borderImageSrc={borderImageSrc} 
                        >
                            <div className={cls.Item}>
                                <a 
                                    href={images[key].src}
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
                                </a>
                            </div>
                        </Border>  
                    ))}
                </div>
            </Fancybox>
        )
    } else if (version === "preview" && seeMoreLink) {
        return (
            <div>
                <Fancybox>
                    <div className={cls.Container}>
                        {Object.keys(images)
                            .slice(0, 8)
                            .map((key: string) => (
                                <Border
                                    key={key}
                                    borderImageSrc={borderImageSrc} 
                                >
                                    <div className={cls.Item}>
                                        <a 
                                            data-fancybox="gallery" 
                                            href={images[key].src}
                                        >
                                            <Image
                                                className={cls.Image}
                                                src={images[key].src} 
                                                alt={`Image ${key}`}
                                                width={images[key].width}
                                                height={images[key].height}
                                            />
                                        </a>
                                    </div>
                                </Border>
                            ))
                        }
                    </div>
                </Fancybox>

                <div ref={ref} className={cls.buttonContainer}>
                    <Button 
                        withScalableLink={true} 
                        theme={ButtonTheme.Graffiti} 
                        className={classNames(cls.SeeMore, mods)} 
                        size={ButtonSize.XL} 
                        ref={ref} 
                    >
                        <Link href={seeMoreLink.href}>
                            {seeMoreLink.text}
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }
}
