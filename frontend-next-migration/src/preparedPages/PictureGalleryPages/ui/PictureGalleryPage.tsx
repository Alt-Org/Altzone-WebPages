'use client';
import React, { useState, useMemo } from 'react';
import { AnimationGallerySection } from '@/widgets/SectionGallery/ui/SectionGalleryV2/SectionGallery';
import {
    getLanguageCode,
    PhotoObject,
    useGetDirectusGalleryImages,
    getCategoryTranslation,
} from '@/entities/Gallery';
import { Container } from '@/shared/ui/Container';
import cls from './PictureGalleryPage.module.scss';
import { useClientTranslation } from '@/shared/i18n';
import useSizes from '@/shared/lib/hooks/useSizes';
import { SearchBar } from '@/preparedPages/DefenseGalleryPages/ui/SingleDefensePage';
import { PageTitle } from '@/shared/ui/PageTitle';
import { classNames } from '@/shared/lib/classNames/classNames';
// import buttonImg from '@/shared/assets/images/gallery/Frame 526.png';
// import { SectionGalleryV2 } from '@/widgets/SectionGallery';
import { useParams } from 'next/navigation';
// import { useGetDirectusGalleryImages, getLanguageCode, getCategoryTranslation, } from '@/entities/Gallery';

export interface Props {
    title: string;
    infoText: string;
    socialsText: string;
    socialMediaLinks: string[];
    videoLink: string;
}
//This may be useful later
/* const PictureGalleryPage = (props: Props) => {
    const { socialMediaLinks } = props;
    const params = useParams();
    const lng = params.lng as string;
    const category = params.category as string;
    const language = getLanguageCode(lng);
    const { photoObjects, isLoading } = useGetDirectusGalleryImages(language);
    const [filteredImages, setFilteredImages] = useState<PhotoObject[]>(photoObjects);
    const allCategory = lng === 'en' ? 'all' : 'kaikki';

    useEffect(() => {
        if (!category || category === allCategory) {
            setFilteredImages(photoObjects);
        } else {
            setFilteredImages(
                photoObjects.filter(
                    (photo) =>
                        getCategoryTranslation(photo.category.translations, language) === category,
                ),
            );
        }
    }, [photoObjects, category]);

    if (isLoading) <p>Loading...</p>;
    */

const PictureGalleryPage = () => {
    const { t } = useClientTranslation('picture-galleries');
    const { isMobileSize, isDesktopSize, isWidescreenSize } = useSizes();
    const [searchQuery, setSearchQuery] = useState('');

    const params = useParams();
    const lng = params.lng as string;
    const categorySlug = params.category as string | undefined;

    const languageCode = getLanguageCode(lng);
    const { photoObjects, isLoading, error } = useGetDirectusGalleryImages(languageCode);

    const isBigDevice = isDesktopSize || isWidescreenSize;
    const allCategory = lng === 'en' ? 'all' : 'kaikki';

    const showCreativity = useMemo(
        () => !isMobileSize && searchQuery.length === 0,
        [isMobileSize, searchQuery],
    );

    // filter images by category from URL params
    const categoryFilteredImages: PhotoObject[] = useMemo(() => {
        if (!photoObjects) return [];
        if (!categorySlug || categorySlug === allCategory) {
            return photoObjects;
        }

        return photoObjects.filter((photo) => {
            if (!photo.category) return false;
            const translatedCategory = getCategoryTranslation(
                photo.category.translations,
                languageCode,
            );
            return translatedCategory === categorySlug;
        });
    }, [photoObjects, categorySlug, allCategory, languageCode]);

    // Filter images by search query matching title, description or subDescription (case-insensitive)
    const filteredImages: PhotoObject[] = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return categoryFilteredImages;
        return categoryFilteredImages.filter((photo) => {
            const fields = [photo.title, photo.description, photo.subDescription];
            return fields.some((find) => (find || '').toLowerCase().includes(query));
        });
    }, [searchQuery, categoryFilteredImages]);

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
                {isBigDevice ? (
                    <div className={cls.TitleBar}>
                        <PageTitle
                            titleText={t('picture-galleries-title')}
                            alternate={true}
                            searchVisible={false}
                        />
                        <SearchBar
                            className={cls.SearchBarDesktop}
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />
                    </div>
                ) : (
                    <SearchBar
                        className={classNames(cls.SearchBarDesktop, undefined, [cls.short])}
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                )}
                {showCreativity && (
                    <div className={cls.Header}>
                        <h1 className={cls.Title}>{t('picture-galleries')}</h1>
                        <p className={cls.InfoText}>{t('info-text')}</p>
                    </div>
                )}
                <AnimationGallerySection
                    animations={filteredImages.map((photo) => ({
                        // Adjust these mappings as needed based on your PhotoObject and FrameSet definitions
                        title: photo.title || '',
                        description: photo.description || '',
                        subDescription: photo.subDescription || '',
                        frames:
                            photo.frames && photo.frames.length > 0
                                ? photo.frames
                                : photo.versions?.preview
                                  ? [[photo.versions.preview.image]]
                                  : [],
                        // Add other FrameSet properties if required
                    }))}
                />
            </Container>
        </div>
    );
};

export default PictureGalleryPage;
