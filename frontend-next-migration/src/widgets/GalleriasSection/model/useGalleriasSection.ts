import {
    transformToGalleryPropsFormat,
    useGetAllDirectoryPhotosQuery,
} from "@/entities/Gallery";
import {ParentDirectory, GalleryCategoriesWithModalSliderProps} from "@/entities/Gallery";


const useGalleriasSection = (parentDirectory: ParentDirectory) => {
    const { data, isError} = useGetAllDirectoryPhotosQuery({ parentDirectory });

    let transformedGalleryCategories: GalleryCategoriesWithModalSliderProps[] = [];
    if (data) {
        transformedGalleryCategories = transformToGalleryPropsFormat(data);
    }

    return {transformedGalleryCategories, isError};
};

export default useGalleriasSection;
