import { ComicReaderProps } from '../ui/ComicReader';
import { DirectoryWithPhotos } from '../api/comicApi';

export const transformToGalleryPropsFormat = (data: DirectoryWithPhotos[]): ComicReaderProps[] => {
    return data?.map((category) => ({
        key: category.directoryName,
        sources: category.photos.map((photo) => photo.url),
        title: category.directoryName,
        cover: { url: category.cover.url, name: category.cover.name },
        followLastImage: false,
    }));
};
