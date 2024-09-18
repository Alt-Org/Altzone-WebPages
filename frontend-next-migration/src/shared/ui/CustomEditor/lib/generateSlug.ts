/**
 * Generates a URL-friendly slug from a given title string.
 *
 * Transformations:
 * 1. Converts the title to lowercase.
 * 2. Replaces spaces with dashes.
 * 3. Removes non-word characters except dashes.
 * 4. Replaces multiple consecutive dashes with a single dash.
 * 5. Removes dashes from the beginning and end.
 *
 * @param title - The input string to be converted into a slug.
 * @returns The generated slug string.
 *
 * @example
 * ```typescript
 * const slug = generateSlug("Hello World! This is an example.");
 * console.log(slug); // Output: "hello-world-this-is-an-example"
 * ```
 */
export function generateSlug(title: string): string {
    const slug = title
        .toLowerCase() // Convert the title to lowercase
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .replace(/[^\w\-]+/g, "") // Remove non-word characters except dashes
        .replace(/\-\-+/g, "-") // Replace multiple consecutive dashes with a single dash
        .replace(/^\-+/, "") // Remove dashes from the beginning
        .replace(/\-+$/, ""); // Remove dashes from the end
    return slug;
}
