'use client'
import VideoContentYoutube from "@/shared/ui/VideoContent/ui/VideoContentYoutube";
import cls from "./SectionVideoAndGalleries.module.scss";
import Image from "next/image";
import bgPicture from "@/shared/assets/images/mainpage/background.webp";
import {GalleryCategoriesWithModalSlider, useGalleryCategories} from "@/entities/Gallery";
import {Container} from "@/shared/ui/Container";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";
import { HorizontalLines } from "@/shared/ui/HorizontalLines";


//todo handle IsError , isLoading cases
const SectionVideoAndGalleries = () => {

    const {
        transformedGalleryCategories,
        isError,
        isLoading
    }
        = useGalleryCategories("artGalleries");


    return (
        <section className={cls.SectionVideoAndGalleries}>

            <div className={cls.backgroundImageWrapper}>
                <Image src={bgPicture} alt="Background" layout="fill" objectFit="cover" quality={100}/>
            </div>


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
            <div className={cls.HorizontalLines}>
                <HorizontalLines />
            </div>
                
        </section>
    );
};

export default SectionVideoAndGalleries;