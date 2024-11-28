'use client';
import { GalleryCategoriesWithModalSlider, ParentDirectory } from '@/entities/Gallery';
import useSectionGallerias from '../model/useSectionGallerias';
import cls from './SectionGallerias.module.scss';
import { SectionGalleriasPaths } from '@/shared/const/SectionGalleriasPaths';

type Props = {
    parentDirectory: ParentDirectory;
};

export const SectionGallerias = ({ parentDirectory }: Props) => {
    const { transformedGalleryCategories, isError } = useSectionGallerias(parentDirectory);

    if (isError) {
        return <div>Server Error</div>;
    }

    const defineId = (pd: typeof parentDirectory) => {
        switch (pd) {
            case SectionGalleriasPaths.comics:
                return 'comics';
            case SectionGalleriasPaths.galleries:
                return 'galleries';
            default:
                throw new Error('Unexpected parent directory');
        }
    };

    return (
        <div
            className={cls.galleries}
            id={defineId(parentDirectory)}
        >
            {transformedGalleryCategories.map((gallery) => (
                <GalleryCategoriesWithModalSlider
                    cover={gallery.cover}
                    followLastImage={gallery.followLastImage}
                    key={gallery.title}
                    sources={gallery.sources}
                    // title={gallery.title}
                />
            ))}
        </div>
    );
};
