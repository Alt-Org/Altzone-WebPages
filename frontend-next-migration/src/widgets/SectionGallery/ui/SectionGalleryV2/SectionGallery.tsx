'use client'
import { EmbedSocialMediaPosts } from "@/shared/ui/SocialMediaEmbed";
import { ImageWall } from "@/entities/Gallery"
import cls from "./SectionGallery.module.scss"
import { useGetStrapiGalleryImages } from "@/entities/Gallery/api/useGetStrapiGalleryImages";
import { useState, useEffect } from "react";
import { ImageData } from "@/entities/Gallery/types/gallery";

interface PreviewProps {
    version: "preview"
    seeMoreLink: {
        text: string
        href: string
    }
}

interface FullProps {
    version: "full"
    seeMoreLink?: never
}

type GalleryProps = (PreviewProps | FullProps) & {
    socialMediaLinks: string[]
}

export const SectionGallery = (props: GalleryProps) => {
    const [images, setImages] = useState<{ [key: string]: ImageData }>({})
    const { version, seeMoreLink, socialMediaLinks } = props

    useEffect(() => {
        const filteredImages = useGetStrapiGalleryImages(
            require.context(
                '/public/images/gallery', false, /\.(png|jpe?g|svg)$/
            ),
            "public/images/gallery"
        )

        setImages(filteredImages)
    },[])

    return (
        <div>
            <EmbedSocialMediaPosts posts={socialMediaLinks} />
            {version === "full" 
                ? <ImageWall version={version} images={images} />
                : <ImageWall version={version} images={images} seeMoreLink={seeMoreLink} />
            }
        </div>
    )
}