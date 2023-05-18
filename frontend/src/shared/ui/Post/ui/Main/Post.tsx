import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Post.module.scss'
import {ParsedPostBody} from "../ParsedPostBody/ParsedPostBody";
import {IPostBodyElement, IPostData} from "../../model/types";

interface PostProps {
    className?: string;
    postData: IPostData;
}

export const Post = ({className='',postData}: PostProps) => {

    const defaultJsonData: IPostBodyElement[] = [];

    return (
        <div className={classNames(cls.Post, {},[className])}>
            <h1>{postData.title} </h1>
            {postData.date.toLocaleDateString()}

            <div style={{marginTop: '10px'}}> <ParsedPostBody jsonData={postData.bodyElements || defaultJsonData}/></div>


        </div>
    );
};
