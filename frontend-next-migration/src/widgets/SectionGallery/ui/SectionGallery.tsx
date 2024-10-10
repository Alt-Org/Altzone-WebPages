import { EmbedInstagramLinks } from "@/shared/ui/InstagramEmbed"
import { ImageWall } from "@/entities/Gallery"
import cls from "./SectionGallery.module.scss"

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
    infoText: string
    socialsText: string
}

export const SectionGallery = (props: GalleryProps) => {
    const { version, infoText, socialsText, seeMoreLink } = props

    return (
        <div>
            <div className={cls.InfoText}>{infoText}</div>
            <div className={cls.SocialsText}>{socialsText}</div>
            <EmbedInstagramLinks />
            {version === "full" 
                ? <ImageWall version={version} />
                : <ImageWall version={version} seeMoreLink={seeMoreLink} />
            }
        </div>
    )
}