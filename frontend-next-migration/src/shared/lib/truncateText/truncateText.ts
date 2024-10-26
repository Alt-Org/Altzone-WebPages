/**
 * Returns a function that truncates a given string to a maximum length and adds an ellipsis at the end if necessary.
 *
 * @param {number} maxLength - The maximum length of the truncated string.
 * @returns {function(string): string} - A function that takes a string as input and returns a truncated version of the string.
 *
 * @example
 *
 * const truncate = truncateText(20);
 * const truncatedText = truncate('This is a long string that needs to be truncated.');
 * console.log(truncatedText); // Output: "This is a long string..."
 */
export function truncateText(maxLength: number) {
    /**
     * Truncates a given string to a maximum length and adds an ellipsis at the end if necessary.
     *
     * @param {string} text - The string to truncate.
     * @returns {string} - The truncated string.
     */
    return function (text: string) {
        if (text.length <= maxLength) {
            return text;
        }
        const ellipsis = '...';
        return text.slice(0, maxLength - ellipsis.length) + ellipsis;
    };
}
