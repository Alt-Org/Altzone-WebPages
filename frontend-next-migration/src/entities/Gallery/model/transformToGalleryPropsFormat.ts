import {DirectoryWithPhotos} from "@/entities/Gallery";
import {GalleryCategoriesWithModalSliderProps} from "../ui/GalleryCategoriesWithModalSlider";

export const transformToGalleryPropsFormat = (data: DirectoryWithPhotos[]): GalleryCategoriesWithModalSliderProps[] => {
    return data?.map(category => ({
        key: category.directoryName,
        sources: category.photos.map(photo => photo.url),
        title: category.directoryName,
        cover: {url: category.cover.url, name: category.cover.name},
        followLastImage: false,
    }));
};