import { IPostData } from '../types';

/**
 * Compares two IPostData objects by their date in descending order.
 *
 * @param a - The first IPostData object.
 * @param b - The second IPostData object.
 * @returns A negative number if b is more recent than a, a positive number if a is more recent than b, or zero if they are the same.
 */
const compareDatesDescending = (a: IPostData, b: IPostData) => {
    const dateA = a.date.getTime();
    const dateB = b.date.getTime();
    return dateB - dateA;
};

/**
 * Sorts an array of IPostData objects by their date in descending order.
 *
 * @param posts - An array of IPostData objects to be sorted.
 * @returns A new array of IPostData objects, sorted by date in descending order.
 *
 * @example
 * const posts: IPostData[] = [
 *     { id: '1', title: 'Post 1', date: new Date('2023-10-01') },
 *     { id: '2', title: 'Post 2', date: new Date('2023-01-15') },
 *     { id: '3', title: 'Post 3', date: new Date('2023-07-20') }
 * ];
 *
 * const sortedPosts = sortPostsByDatesDesc(posts);
 * console.log(sortedPosts);
 * // Output:
 * // [
 * //  { id: '1', title: 'Post 1', date: new Date('2023-10-01') },
 * //  { id: '3', title: 'Post 3', date: new Date('2023-07-20') },
 * //  { id: '2', title: 'Post 2', date: new Date('2023-01-15') }
 * // ]
 */
export function sortPostsByDatesDesc(posts: IPostData[]) {
    return posts.sort(compareDatesDescending);
}
