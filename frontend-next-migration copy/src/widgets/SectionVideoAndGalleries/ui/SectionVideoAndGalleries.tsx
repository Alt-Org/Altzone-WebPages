'use client'
import VideoContentYoutube from "@/shared/ui/VideoContent/ui/VideoContentYoutube";
import cls from "./SectionVideoAndGalleries.module.scss";
import Image from "next/image";
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";
import {GalleryCategoriesWithModalSlider, useGalleryCategories} from "@/entities/Gallery";
import {Container} from "@/shared/ui/Container";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";


type Props = {
    backgroundImageSrc? : string
}

//todo handle IsError , isLoading cases
const SectionVideoAndGalleries = (props: Props) => {

    const {backgroundImageSrc} = props;

    const {
        transformedGalleryCategories,
        isError,
        isLoading
    }
        = useGalleryCategories("artGalleries");


    return (
        <section
            className={cls.SectionVideoAndGalleries}
            style={{ backgroundImage: backgroundImageSrc ? `url(${backgroundImageSrc})` : 'none' }}
        >
            <Container className={cls.container}>
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

export default SectionVideoAndGalleries;