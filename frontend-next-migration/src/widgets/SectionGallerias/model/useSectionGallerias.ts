'use client';
import { useGalleryCategories, ParentDirectory } from '@/entities/Gallery';

const useSectionGallerias = (parentDirectory: ParentDirectory) => {
    const { transformedGalleryCategories, isError, isLoading } =
        useGalleryCategories(parentDirectory);

    return { transformedGalleryCategories, isError, isLoading };
};

export default useSectionGallerias;
