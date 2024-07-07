'use client'
import VideoContentYoutube from "@/shared/ui/VideoContent/ui/VideoContentYoutube";
import cls from "./VideoAndGalleries.module.scss";
import Image from "next/image";
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";
import {GalleryCategoriesWithModalSlider, useGalleryCategories} from "@/entities/Gallery";
import {Container} from "@/shared/ui/Container";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";
import useSizes from "@/shared/lib/hooks/useSizes";


type Props = {
    backgroundImageSrc? : string;
    title: string;
}

//todo handle IsError , isLoading cases
const VideoAndGalleries = (props: Props) => {

    const {
        backgroundImageSrc,
        title
    } = props;

    const {
        transformedGalleryCategories,
        isError,
        isLoading
    }
        = useGalleryCategories("artGalleries");

    const {isMobileSize, isTabletSize} = useSizes();

    return (
        <section
            className={cls.SectionVideoAndGalleries}
            style={{backgroundImage: backgroundImageSrc ? `url(${backgroundImageSrc})` : 'none'}}
        >

            <h3 className={cls.title}>
                {title}
            </h3>

            <Container className={cls.container} fluid={isMobileSize || isTabletSize}>
                <div className={cls.videoWrapper}>
                    <VideoContentYoutube
                        src={AppExternalLinks.previewVideoYoutube}
                        params={{
                            // autoPlay: true,
                            title: "video"
                        }}
                    />
                </div>

                <div className={cls.galleries}>
                    {
                        transformedGalleryCategories.map((gallery: any) => (
                            <GalleryCategoriesWithModalSlider
                                cover={gallery.cover}
                                followLastImage={gallery.followLastImage}
                                key={gallery.title}
                                sources={gallery.sources}
                                title={gallery.title}
                            />
                        ))
                    }
                </div>
            </Container>


        </section>
    );
};

export default VideoAndGalleries;