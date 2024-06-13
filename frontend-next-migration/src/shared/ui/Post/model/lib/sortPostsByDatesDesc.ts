import {IPostData} from "../types";

const compareDatesDescending = (a: IPostData, b: IPostData) => {
    const dateA = a.date.getTime();
    const dateB = b.date.getTime();
    return dateB - dateA;
};

export function sortPostsByDatesDesc(posts: IPostData[]){
    return posts.sort(compareDatesDescending)
}