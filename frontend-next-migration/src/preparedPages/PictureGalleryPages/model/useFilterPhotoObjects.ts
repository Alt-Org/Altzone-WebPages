import { useMemo, useState } from 'react';
import { PhotoCategory, PhotoObject } from '@/entities/Gallery';
import { useClientTranslation } from '@/shared/i18n';

export const useFilterPhotoObjects = (photoObjects: PhotoObject[]) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { t } = useClientTranslation('picture-galleries');
    const [currentCategory, setCurrentCategory] = useState<PhotoCategory>({
        id: 'all-categories',
        name: t('all-categories') ?? 'All',
    });
    const [sortBy, setSortBy] = useState<'date_asc' | 'date_desc' | 'title'>('date_desc');
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

    const filteredImages: PhotoObject[] = useMemo(() => {
        let filtered = photoObjects;

        // filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.trim().toLowerCase();
            filtered = filtered.filter(
                (photo) =>
                    photo.title?.toLowerCase().includes(query) ||
                    photo.author?.toLowerCase().includes(query) ||
                    photo.description?.toLowerCase().includes(query),
            );
        }

        // filter by category
        if (currentCategory && currentCategory.id !== 'all-categories') {
            filtered = filtered.filter(
                (photo) => photo.category && photo.category.id === currentCategory.id,
            );
        }

        // filter by selected authors
        if (selectedAuthors.length > 0) {
            filtered = filtered.filter(
                (photo) => photo.author && selectedAuthors.includes(photo.author),
            );
        }

        // sort the filtered images
        return [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'date_asc':
                    return new Date(a.date_created).getTime() - new Date(b.date_created).getTime();

                case 'date_desc':
                    return new Date(b.date_created).getTime() - new Date(a.date_created).getTime();

                case 'title':
                    return a.title?.localeCompare(b.title ? b.title : '') || 0;

                default:
                    return 0;
            }
        });
    }, [photoObjects, currentCategory, searchQuery, selectedAuthors, sortBy]);

    return {
        filteredImages,
        filters: {
            searchQuery,
            currentCategory,
            sortBy,
            selectedAuthors,
        },
        setFilters: {
            setSearchQuery,
            setCurrentCategory,
            setSortBy,
            setSelectedAuthors,
        },
    };
};
