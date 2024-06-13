import {IPostData} from "../types";

export function getPostDataById(id: string, data: IPostData[]): IPostData | undefined {
    return data.find(postData => postData.id === id);
}