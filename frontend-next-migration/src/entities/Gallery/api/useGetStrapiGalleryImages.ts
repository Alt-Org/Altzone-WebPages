import { ImageData } from '../types/gallery';

export const useGetStrapiGalleryImages = (
    r: __WebpackModuleApi.RequireContext,
    path: string,
): { [key: string]: ImageData } => {
    const images: { [key: string]: ImageData } = {};

    r.keys().forEach((key) => {
        const imagePath = r(key);
        const imageKey = key.replace('./', '');
        images[imageKey] = imagePath.default;
    });

    return Object.keys(images).reduce(
        (img, key: string) => {
            if (key.startsWith(path)) {
                img[key] = images[key];
            }
            return img;
        },
        {} as { [key: string]: ImageData },
    );
};
