'use client';
import { GalleryCategoriesWithModalSlider, ParentDirectory } from '@/entities/Gallery';
import useSectionGallerias from '../model/useSectionGallerias';
import cls from './SectionGallerias.module.scss';

type Props = {
    parentDirectory: ParentDirectory;
};

export const SectionGallerias = ({ parentDirectory }: Props) => {
    const { transformedGalleryCategories, isError } = useSectionGallerias(parentDirectory);

    if (isError) {
        return <div>Server Error</div>;
    }

    return (
        <div className={cls.galleries}>
            {transformedGalleryCategories.map((gallery: any) => (
                <GalleryCategoriesWithModalSlider
                    cover={gallery.cover}
                    followLastImage={gallery.followLastImage}
                    key={gallery.title}
                    sources={gallery.sources}
                    title={gallery.title}
                />
            ))}
        </div>
    );
};
