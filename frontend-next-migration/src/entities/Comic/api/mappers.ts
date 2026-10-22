import { envHelper } from '@/shared/const/envHelper';
import type { Comics, ComicReaderProps } from '../types/types';

export const mapDirectusToComicReaders = (
    comics: Comics[],
    lng: 'fi' | 'en' = 'en',
): ComicReaderProps[] => {
    const assetUrl = (fileId: string) =>
        `${envHelper.directusHost.replace(/\/+$/, '')}/assets/${fileId}`;

    return comics
        .filter((comic) => comic.status === 'published')
        .flatMap((comic) => {
            const pages = comic.pages;
            const coverId = comic.cover_image || pages[0]?.directus_files_id;
            if (!coverId) return [];

            const title = comic.translations?.[lng]?.title || comic.title;

            return [
                {
                    title,
                    sources: pages.map((page) => assetUrl(page.directus_files_id)),
                    cover: { url: assetUrl(coverId), name: title },
                    followLastImage: false,
                },
            ];
        });
};
