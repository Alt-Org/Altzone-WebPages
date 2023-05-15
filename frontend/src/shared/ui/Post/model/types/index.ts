interface ImageData {
    widthPx?: number;
    heightPx?: number;
    type: 'image';
    url: string;
    alt: string;
}

interface TextData {
    type: 'text';
    content: string;
}


export type IPostBodyElement = ImageData | TextData;

export interface IPostData {
    id: string;
    title: string;
    date: Date;
    bodyElements: IPostBodyElement[];
}