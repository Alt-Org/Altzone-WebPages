import {IPostData} from "../types";

/**
 * Retrieves a post data object by its ID from a list of post data.
 *
 * @param id - The ID of the post to retrieve.
 * @param data - The array of post data objects to search through.
 * @returns The post data object with the matching ID, or undefined if not found.
 *
 * @example
 * const posts: IPostData[] = [
 *   { id: '1', title: 'Post 1', date: new Date(), bodyElements: [] },
 *   { id: '2', title: 'Post 2', date: new Date(), bodyElements: [] },
 * ];
 *
 * const post = getPostDataById('1', posts);
 * console.log(post);  // { id: '1', title: 'Post 1', date: new Date(), bodyElements: [] }
 */
export function getPostDataById(id: string, data: IPostData[]): IPostData | undefined {
    return data.find(postData => postData.id === id);
}