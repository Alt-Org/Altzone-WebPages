export type {
    IGalleryDirectory,
    IGalleryPicture,
    ImageData,
    PhotoObject,
    Category,
    PhotoCategory,
    CategoryTranslations,
} from './types/gallery';

export type { ParentDirectory } from './model/galleryApi';
export { useGalleryCategories } from './model/useGalleryCategories';
export { mockImagesFull, mockImagesPreview } from './model/mockImages';

export type { GalleryCategoriesWithModalSliderProps } from './ui/GalleryCategoriesWithModalSlider';
export { GalleryCategoriesWithModalSlider } from './ui/GalleryCategoriesWithModalSlider';
// export { ImageWall } from './ui/ImageWall/ImageWall';
export { useGetStrapiGalleryImages } from './api/useGetStrapiGalleryImages';
export { useGetDirectusGalleryImages } from './api/useGetDirectusGalleryImages';
export { useGetGalleryCategoriesQuery } from './api/galleryCategoriesApi';
export { getLanguageCode } from './api/translations';
