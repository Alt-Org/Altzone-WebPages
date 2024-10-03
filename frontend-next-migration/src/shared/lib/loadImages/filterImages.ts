/**
 * Filters the imported images by a given path prefix, returning only the 
 * images that match the specified path.
 *
 * This function takes a path string and an object of imported images, then 
 * returns a new object containing only the images whose keys (file paths) 
 * start with the specified path.
 *
 * Example usage:
 * ```
 * const filteredImages = filterImages('path/to/images/', importedImages);
 * ```
 *
 * @param {string} path - The prefix to match against the image file paths
 *  (e.g., 'gallery').
 * @param {{ [key: string]: string }} importedImages - An object containing
 * image paths mapped to their respective URLs, typically the output from 
 * `importAllImages`.
 * 
 * @returns {{ [key: string]: string }} - A new object containing only the 
 * images whose paths start with the given path.
 */

export const filterImages = (
    path: string, 
    importedImages: { [key: string]: string }
): { [key: string]: string } => {

    return Object.keys(importedImages).reduce((img, key: string) => {
        if (key.startsWith(path)) {
            img[key] = importedImages[key]
        }
        return img
    }, {} as { [key: string]: string })
}