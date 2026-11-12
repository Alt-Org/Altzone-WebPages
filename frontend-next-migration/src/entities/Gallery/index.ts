export type {
    IGalleryDirectory,
    IGalleryPicture,
    ImageData,
    PhotoObject,
    Category,
    PhotoCategory,
    CategoryTranslations,
} from './types/gallery';

export { useGetStrapiGalleryImages } from './api/useGetStrapiGalleryImages';
export { useGetDirectusGalleryImages } from './api/useGetDirectusGalleryImages';
export { useGetGalleryCategoriesQuery } from './api/galleryCategoriesApi';
export { getLanguageCode } from './api/translations';
