/**
 * Imports all images from the given `require.context` object and returns an 
 * object mapping image file names to their respective paths.
 * 
 * The `require.context` function is a special Webpack feature that allows 
 * dynamically requiring all files within a specific directory. The parameter 
 * `r` should be the result of invoking `require.context`, which provides the 
 * ability to import multiple files at once.
 *
 * Example usage:
 * ```
 * const images = importAllImages(
 *  require.context('/path/to/images/', false, /\.(png|jpe?g|svg)$/)
 * );
 * ```
 *
 * @param {__WebpackModuleApi.RequireContext} r - The result of Webpack's 
 * `require.context` function, used to dynamically require image files.
 * 
 * @returns {{ [key: string]: string }} - An object where each key is the image
 * file name (without the `./` prefix), and the value is the resolved path to 
 * the image file.
 */

export const importAllImages = (
    r: __WebpackModuleApi.RequireContext
): { [key: string]: string } => {

    let images: { [key: string]: string } = {}

    r.keys().forEach((key) => { 
        const imagePath = r(key)
        const imageKey = key.replace('./', '')
        images[imageKey] = imagePath.default
    })

    return images
};
