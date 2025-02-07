'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SectionGalleryV2 } from '@/widgets/SectionGallery';
import {
    useGetDirectusGalleryImages,
    getLanguageCode,
    PhotoObject,
    getCategoryTranslation,
} from '@/entities/Gallery';
import { Container } from '@/shared/ui/Container';
import cls from './PictureGalleryPage.module.scss';

export interface Props {
    title: string;
    infoText: string;
    socialsText: string;
    socialMediaLinks: string[];
    videoLink: string;
}

const PictureGalleryPage = (props: Props) => {
    const { socialMediaLinks } = props;
    const params = useParams();
    const lng = params.lng as string;
    const category = params.category as string;
    const language = getLanguageCode(lng);
    const { photoObjects, isLoading } = useGetDirectusGalleryImages(language);
    const [filteredImages, setFilteredImages] = useState<PhotoObject[]>(photoObjects);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        if (!category || selectedCategory === 'all' || selectedCategory === 'kaikki') {
            setFilteredImages(photoObjects);
        } else {
            setSelectedCategory(category);
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
