'use client'
import { EmbedSocialMediaPosts } from "@/shared/ui/SocialMediaEmbed"
import { SectionGallerias } from "@/widgets/SectionGallerias"
import { SectionGalleriasPaths } from "@/shared/const/SectionGalleriasPaths"
import VideoContentYoutube from "@/shared/ui/VideoContent/ui/VideoContentYoutube"
import cls from "./SectionGallery.module.scss"
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button"
import Link from "next/link"
import { classNames } from "@/shared/lib/classNames/classNames"
import { useInView } from "react-intersection-observer"

export type SectionGalleryProps = {
    socialMediaLinks: string[],
    videoLink: string
    seeMoreLink?: {
        text: string
        href: string
    }
}

export const SectionGallery = (props: SectionGalleryProps) => {
    const { socialMediaLinks, videoLink, seeMoreLink } = props

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView
    }

    return (
        <div>
            <EmbedSocialMediaPosts posts={socialMediaLinks} />

            <div className={cls.Row}>
                <div className={cls.videoWrapper}>
                    <VideoContentYoutube
                        params={{
                            className: cls.VideoContentYoutube
                        }}
                        src={videoLink}
                    />
                </div>

                <SectionGallerias parentDirectory={SectionGalleriasPaths.comics} />
            </div>

            {seeMoreLink &&
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
            }
        </div>
    )
}