'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { AnimationGallerySection } from '@/widgets/SectionGallery';
import { getLanguageCode, PhotoCategory, useGetDirectusGalleryImages } from '@/entities/Gallery';
import { Container } from '@/shared/ui/Container';
import cls from './PictureGalleryPage.module.scss';
import { useClientTranslation } from '@/shared/i18n';
import useSizes from '@/shared/lib/hooks/useSizes';
import { SearchBar } from '@/preparedPages/DefenseGalleryPages/ui/SingleDefensePage';
import { PageTitle } from '@/shared/ui/PageTitle';
import { useParams } from 'next/navigation';
import { useFilterPhotoObjects } from '../model/useFilterPhotoObjects';
import { NavigateGalleryTabs } from './NavigateGalleryTabs';
import { FilterDropdowns } from './FilterDropdowns/FilterDropdowns';

const PictureGalleryPage = () => {
    const { t } = useClientTranslation('picture-galleries');
    const { isDesktopSize, isWidescreenSize } = useSizes();
    const isBigDevice = isDesktopSize || isWidescreenSize;
    const [sectionBG, setSectionBG] = useState('#527259');

    const params = useParams();
    const lng = params.lng as string;
    const languageCode = getLanguageCode(lng);

    const { photoObjects, categories, isLoading, error } =
        useGetDirectusGalleryImages(languageCode);

    // filters
    const { filteredImages, filters, setFilters, resetFilters } =
        useFilterPhotoObjects(photoObjects);

    // add "all categories" to categories
    const allCategories: PhotoCategory[] = useMemo(() => {
        if (!categories) return [];
        return [
            {
                id: 'all-categories',
                name: t('all-categories') ?? 'All',
            },
            ...categories,
        ];
    }, [categories, t]);

    // useEffect for smooth scrolling to anchor when hash changes or page loads with hash
    useEffect(() => {
        if (isLoading || error || filteredImages.length === 0) return;

        const scrollToHash = () => {
            const anchorId = window.location.hash.slice(1);
            if (!anchorId) return;

            const element = document.getElementById(anchorId.toLowerCase());
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        };

        scrollToHash();
        window.addEventListener('hashchange', scrollToHash);

        return () => {
            window.removeEventListener('hashchange', scrollToHash);
        };
    }, [isLoading, error, filteredImages]);

    if (isLoading) {
        return (
            <div className={cls.Wrapper}>
                <Container className={cls.Container}>
                    <p>{t('loading') ?? 'Loading...'}</p>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className={cls.Wrapper}>
                <Container className={cls.Container}>
                    <p>{t('error-text') ?? 'Error loading gallery.'}</p>
                </Container>
            </div>
        );
    }

    return (
        <div className={cls.Wrapper}>
            <Container className={cls.Container}>
                <div className={cls.TitleBar}>
                    <PageTitle
                        titleText={t('picture-galleries-title')}
                        alternate={true}
                        searchVisible={false}
                    />
                    {isBigDevice && (
                        <SearchBar
                            className={cls.SearchBarDesktop}
                            value={filters.searchQuery}
                            onChange={setFilters.setSearchQuery}
                        />
                    )}
                </div>

                <div className={cls.Header}>
                    <h1 className={cls.Title}>{t('picture-galleries')}</h1>
                    <p className={cls.InfoText}>{t('info-text')}</p>
                </div>
                {!isBigDevice && (
                    <SearchBar
                        className={cls.short}
                        value={filters.searchQuery}
                        onChange={setFilters.setSearchQuery}
                    />
                )}

                <FilterDropdowns
                    photoObjects={photoObjects}
                    sortBy={filters.sortBy}
                    setSortBy={setFilters.setSortBy}
                    selectedAuthors={filters.selectedAuthors}
                    setSelectedAuthors={setFilters.setSelectedAuthors}
                    resetFilters={resetFilters}
                />

                <NavigateGalleryTabs
                    categories={allCategories}
                    setBackgroundColor={setSectionBG}
                    currentCategory={filters.currentCategory}
                    setCurrentCategory={setFilters.setCurrentCategory}
                />
                <AnimationGallerySection
                    animations={filteredImages}
                    backgroundColor={sectionBG}
                />
            </Container>
        </div>
    );
};

export default PictureGalleryPage;
