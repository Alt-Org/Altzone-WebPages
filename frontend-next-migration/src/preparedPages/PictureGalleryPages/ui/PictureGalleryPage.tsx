'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SectionGalleryV2 } from '@/widgets/SectionGallery';
import { GalleryNavMenuAsDropdown } from '@/features/NavigateGalleries';
import { LayoutWithSidebars } from '../../Layouts';
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
    const language = getLanguageCode(lng);
    const { photoObjects, isLoading } = useGetDirectusGalleryImages(language);
    const [filteredImages, setFilteredImages] = useState<PhotoObject[]>(photoObjects);
    const allCategory = lng === 'en' ? 'all' : 'kaikki';
    const [selectedCategory, setSelectedCategory] = useState<string>(allCategory);

    const isTouchDevice = isTabletSize || isMobileSize;

    useEffect(() => {
        if (selectedCategory === allCategory) {
            setFilteredImages(photoObjects);
        } else {
            setFilteredImages(
                photoObjects.filter(
                    (photo) =>
                        getCategoryTranslation(photo.category.translations, language) ===
                        selectedCategory,
                ),
            );
        }
    }, [photoObjects, selectedCategory]);

    if (isLoading) return <p>Loading...</p>;

    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: (
                    <GalleryNavMenuAsDropdown
                        openByDefault={true}
                        language={language}
                        allCategory={allCategory}
                        onClickCallback={(category) => {
                            setSelectedCategory(category);
                        }}
                        selectedCategory={selectedCategory}
                        isTouchDevice={false}
                    />
                ),
                hideOnMobile: true,
            }}
        >
            <div className={cls.Wrapper}>
                <Container className={cls.Container}>
                    <h1>{title}</h1>
                    <p className={cls.InfoText}>{infoText}</p>

                    {isTouchDevice && (
                        <GalleryNavMenuAsDropdown
                            openByDefault={true}
                            language={language}
                            allCategory={allCategory}
                            onClickCallback={(category) => {
                                setSelectedCategory(category);
                            }}
                            selectedCategory={selectedCategory}
                            isTouchDevice={true}
                        />
                    )}

                    <SectionGalleryV2
                        version={'full'}
                        socialMediaLinks={socialMediaLinks}
                        images={filteredImages}
                    />
                </Container>
            </div>
        </LayoutWithSidebars>
    );
};

export default PictureGalleryPage;
