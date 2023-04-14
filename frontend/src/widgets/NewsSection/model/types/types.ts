export interface INewsElement{
    title : string;
    body: string;
    date: Date;
    readMoreLink: {
        name : string;
        path: string;
    }
}