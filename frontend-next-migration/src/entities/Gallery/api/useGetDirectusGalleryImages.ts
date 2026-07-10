import { useGetPhotoObjectsV2Query } from './galleryApi';
import { useGetGalleryCategoriesQuery } from './galleryCategoriesApi';
import { mapDirectusToPhotoObjectV2 } from './mappers';
import { PhotoObjectV2, PhotoCategory } from '../types/gallery';
import { useMemo } from 'react';
import { getTranslation } from './translations';

export const useGetDirectusGalleryImages = (lng: string) => {
    const { data: poData, error: poError, isLoading: poIsLoading } = useGetPhotoObjectsV2Query();
    const { data: cData, error: cError, isLoading: cIsLoading } = useGetGalleryCategoriesQuery();

    const isLoading = poIsLoading || cIsLoading;
    const error = poError || cError;

    const categories: PhotoCategory[] = useMemo(() => {
        if (!cData) return [];
        return cData.map((item) => ({
            id: item.id,
            name: getTranslation(item.translations || [], lng, 'name', ''),
        }));
    }, [cData, lng]);

    const photoObjects: PhotoObjectV2[] = useMemo(() => {
        if (!poData) return [];
        return mapDirectusToPhotoObjectV2(poData, lng);
    }, [poData, lng]);

    return {
        photoObjects,
        categories,
        error,
        isLoading,
    };
};
