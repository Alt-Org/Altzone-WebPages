'use client'
import useGalleriasSection from "../model/useGalleriasSection";
import {GalleryCategoriesWithModalSlider, ParentDirectory} from "@/entities/Gallery";
import cls from "./GalleriasSection.module.scss";

type Props = {
    parentDirectory: ParentDirectory
}

export const GalleriasSection = ({parentDirectory}: Props) => {

    const {transformedGalleryCategories, isError} = useGalleriasSection(parentDirectory)

    if(isError){
        return (
            <div>Server Error</div>
        )
    }
    return (
        <div className={cls.galleries}>
            {
                transformedGalleryCategories?.map((gallery: any) => (
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
    )
}