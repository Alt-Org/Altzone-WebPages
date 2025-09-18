import { ImageData } from '../types/gallery';

export const useGetStrapiGalleryImages = (
    req: __WebpackModuleApi.RequireContext,
    path: string,
): { [key: string]: ImageData } => {
    const images: { [key: string]: ImageData } = {};

    req.keys().forEach((key) => {
        const imagePath = req(key);
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
