'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SectionGalleryV2 } from '@/widgets/SectionGallery';
import { GalleryNavMenuAsDropdown } from '@/features/NavigateGalleries';
import {
    useGetDirectusGalleryImages,
    getLanguageCode,
    PhotoObject,
    getCategoryTranslation,
} from '@/entities/Gallery';
import { Container } from '@/shared/ui/Container';
import useSizes from '@/shared/lib/hooks/useSizes';
import cls from './PictureGalleryPage.module.scss';

export interface Props {
    title: string;
    infoText: string;
    socialsText: string;
    socialMediaLinks: string[];
    videoLink: string;
}

const PictureGalleryPage = (props: Props) => {
    const { title, infoText, socialMediaLinks } = props;
    const { isMobileSize, isTabletSize } = useSizes();
    const params = useParams();
    const lng = params.lng as string;
    const category = params.category as string;
    const language = getLanguageCode(lng);
    const { photoObjects, isLoading } = useGetDirectusGalleryImages(language);
    const [filteredImages, setFilteredImages] = useState<PhotoObject[]>(photoObjects);
    const allCategory = lng === 'en' ? 'all' : 'kaikki';
    const isTouchDevice = isTabletSize || isMobileSize;
    const [selectedCategory, setSelectedCategory] = useState<string>(
        isTouchDevice ? allCategory : '',
    );

    useEffect(() => {
        if (!category || selectedCategory === allCategory) {
            setFilteredImages(photoObjects);
        } else {
            if (!isTouchDevice) {
                setSelectedCategory(category);
            }
            setFilteredImages(
                photoObjects.filter(
                    (photo) =>
                        getCategoryTranslation(photo.category.translations, language) ===
                        selectedCategory,
                ),
            );
        }
    }, [photoObjects, selectedCategory]);

    if (isLoading) <p>Loading...</p>;

    return (
        <div className={cls.Wrapper}>
            <Container className={cls.Container}>
                <h1>{title}</h1>
                <p className={cls.InfoText}>{infoText}</p>

                {isTouchDevice && (
                    <GalleryNavMenuAsDropdown
                        openByDefault={false}
                        language={language}
                        allCategory={allCategory}
                        onClickCallback={(category) => {
                            setSelectedCategory(category);
                        }}
                        selectedCategory={selectedCategory}
                    />
                )}

                <SectionGalleryV2
                    version={'full'}
                    socialMediaLinks={socialMediaLinks}
                    images={filteredImages}
                />
            </Container>
        </div>
    );
};

export default PictureGalleryPage;
