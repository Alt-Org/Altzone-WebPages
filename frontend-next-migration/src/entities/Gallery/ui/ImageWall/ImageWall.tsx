'use client'; 
import Masonry from "react-masonry-css"
import cls from "./ImageWall.module.scss"
import { importAllImages, filterImages } from '@/shared/lib/loadImages/';
import Image from "next/image";
import { memo, useState, useEffect } from "react";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button";
import {useInView} from "react-intersection-observer";
import {classNames} from "@/shared/lib/classNames/classNames";
import Link from "next/link";
import {Version} from "../../types/gallery"

export type ImageWallProps = {
    version: Version
    seeMoreLink?: {
        href: string,
        text: string,
    }
}

export const ImageWall = memo((props: ImageWallProps) => {
    const [images, setImages] = useState<{ [key: string]: string }>({})
    const { version, seeMoreLink } = props

    useEffect(() => {
        const importedImages = importAllImages(
            require.context(
                '/public/images/gallery', false, /\.(png|jpe?g|svg)$/
            )
        );

        const filteredImages = filterImages(
            "public/images/gallery", importedImages
        )

        setImages(filteredImages)
        
    },[])

    const breakpoints = {
        default: 4,
        1250: 3,
        950: 2,
        300: 1
    }

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView
    }

    if (version === "full") {
        return (
            <div>
                <Masonry 
                    breakpointCols={breakpoints} 
                    className={cls.MasonryGrid}
                    columnClassName={cls.MasonryGridColumn}
                >
                    {Object.keys(images).map((key: string) => (
                        <Image 
                            key={key} 
                            className={cls.Image}
                            src={images[key]} 
                            alt={`Image ${key}`}
                        />
                    ))}
                    
                </Masonry>
            </div>
        )
    } else if (version === "preview" && seeMoreLink) {
        return (
            <div>
                <Masonry 
                    breakpointCols={breakpoints} 
                    className={cls.MasonryGrid}
                    columnClassName={cls.MasonryGridColumn}
                >
                    {Object.keys(images)
                        .slice(0, 4)
                        .map((key: string) => (
                        <Image 
                            key={key} 
                            className={cls.Image}
                            src={images[key]} 
                            alt={`Image ${key}`}
                        />
                    ))}
                </Masonry>

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
    
})

ImageWall.displayName = "ImageWall"