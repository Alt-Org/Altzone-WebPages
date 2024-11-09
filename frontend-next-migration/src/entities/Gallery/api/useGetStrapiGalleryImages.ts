/**
 * Imports all images from the given `require.context` object and then 
 * filters the imported images by a given path prefix, returning only the 
 * images that match the specified path.
 * 
 * The `require.context` function is a special Webpack feature that allows 
 * dynamically requiring all files within a specific directory. The parameter 
 * `r` should be the result of invoking `require.context`, which provides the 
 * ability to import multiple files at once.
 *
 * Example usage:
 * ```
 * const images = importAllImages(
 *  require.context('/path/to/images/', false, /\.(png|jpe?g|svg)$/),
 *  "path/to/images"
 * );
 * ```
 *
 * @param {__WebpackModuleApi.RequireContext} r - The result of Webpack's 
 * `require.context` function, used to dynamically require image files.
 * 
 * @param {string} path - The prefix to match against the image file paths
 *  (e.g., 'gallery').
 * 
 * @returns {{ [key: string]: string }} - A new object containing only the 
 * images whose paths start with the given path.
 */
import { ImageData } from "../types/gallery";

export const useGetStrapiGalleryImages = (
    r: __WebpackModuleApi.RequireContext,
    path: string
): { [key: string]: ImageData } => {

    let images: { [key: string]: ImageData } = {}

    r.keys().forEach((key) => { 
        const imagePath = r(key)
        const imageKey = key.replace('./', '')
        images[imageKey] = imagePath.default
    })

    return Object.keys(images).reduce((img, key: string) => {
        if (key.startsWith(path)) {
            img[key] = images[key]
        }
        return img
    }, {} as { [key: string]: ImageData })
};
