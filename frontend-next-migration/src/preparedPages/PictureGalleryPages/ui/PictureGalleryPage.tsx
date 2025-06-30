'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { SectionGalleryV2 } from '@/widgets/SectionGallery';
import { AnimationGallerySection } from '@/widgets/SectionGallery/ui/SectionGalleryV2/SectionGallery';
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
    // Dummy data for filteredImages to avoid errors
    const filteredImages: PhotoObject[] = [
        {
            title: 'ensimmäinen Otsikko',
            description: 'ensimmäinen Kuvaus',
            frames: [['/frontend-next-migration/src/shared/assets/images/heros/conman/conman.png', '/images/picture124.PNG']],
        },
        {
            title: 'Toinen Otsikko',
            description: 'Toinen Kuvaus',
            frames: [['/images/picture125.PNG', '/images/picture126.PNG']],
        },
        {
            title: 'Kolmas Otsikko',
            description: 'Kolmas Kuvaus',
            frames: [['/images/picture127.PNG', '/images/picture128.PNG']],
        },
    ];

    return (
        <div className={cls.Wrapper}>
            {/* <Container className={cls.Container}>
                <SectionGalleryV2
                    version={'full'}
                    socialMediaLinks={socialMediaLinks}
                    images={filteredImages}
                />
            </Container> */}
            <Container className={cls.Container}>
                <AnimationGallerySection
                    animations={filteredImages.map((photo) => ({
                        // Adjust these mappings as needed based on your PhotoObject and FrameSet definitions
                        title: photo.title || '',
                        description: photo.description || '',
                        frames: photo.frames || [],
                        // Add other FrameSet properties if required
                    }))}
                />
            </Container>
        </div>
    );
};

export default PictureGalleryPage;
