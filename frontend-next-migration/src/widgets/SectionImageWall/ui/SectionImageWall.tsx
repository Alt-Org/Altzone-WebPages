'use client'; 
import Masonry from "react-masonry-css"
import cls from "./SectionGalleryImages.module.scss"
import { importAllImages, filterImages } from '@/shared/lib/loadImages/';
import Image from "next/image";
import { memo, useState, useEffect } from "react";

export const SectionImageWall = memo(() => {
    const [images, setImages] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        const importedImages = importAllImages(
            require.context(
                '/public/images/gallery', false, /\.(png|jpe?g|svg)$/
            )
        );
        console.log("imported images: ", importedImages)

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
})

SectionImageWall.displayName = "SectionImageWall"