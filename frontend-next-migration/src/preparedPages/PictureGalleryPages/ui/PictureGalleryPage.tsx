'use client';
import { SectionGalleryV2 } from '@/widgets/SectionGallery';
import { Container } from '@/shared/ui/Container';
import cls from './PictureGalleryPage.module.scss';
import useSizes from '@/shared/lib/hooks/useSizes';
import { GalleryNavMenuAsDropdown } from '@/features/NavigateGalleries';
import { useGetDirectusGalleryImages, getLanguageCode, PhotoObject } from '@/entities/Gallery';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

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
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const isTouchDevice = isTabletSize || isMobileSize;

    useEffect(() => {
        if (!category || selectedCategory === 'all' || selectedCategory === 'kaikki') {
            setFilteredImages(photoObjects);
        } else {
            setSelectedCategory(category);
            setFilteredImages(
                photoObjects.filter(
                    (photo) => photo.category.name.toLowerCase() === selectedCategory,
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

                {isTouchDevice && <GalleryNavMenuAsDropdown />}

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

// import { YouTubeFacade } from '@/shared/ui/YouTubeFacade';

// import { SectionGallerias } from '@/widgets/SectionGallerias';
// import { SectionGalleriasPaths } from "@/shared/const/SectionGalleriasPaths";

{
    /*<p className={cls.SocialsText}>{socialsText}</p>*/
}

{
    /* <SectionGallerias parentDirectory={SectionGalleriasPaths.artGalleries} /> */
}

{
    /*version1*/
}
{
    /*<SectionGalleryV1*/
}
{
    /*    socialMediaLinks={socialMediaLinks}*/
}
{
    /*    videoLink={videoLink}*/
}
{
    /*/>*/
}

{
    /*<div className={cls.videoWrapper}>*/
}
{
    /*    <YouTubeFacade previewVideoYoutube={videoLink} />*/
}
{
    /*</div>*/
}

{
    /*<SectionGallerias parentDirectory={SectionGalleriasPaths.galleries} />*/
}
{
    /*<SectionGallerias parentDirectory={SectionGalleriasPaths.comics} />*/
}

{
    /* version2 */
}
