import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Post.module.scss'
import {ParsedPostBody} from "../ParsedPostBody/ParsedPostBody";
import {IPostBodyElement, IPostData} from "../../model/types";

interface PostProps {
    className?: string;
    postData: IPostData;
}

/**
 * Component to display a Post.
 *
 * @param props - The properties for the Post component.
 * @param props.className - Additional class names to apply.
 * @param props.postData - The data for the post.
 *
 * @example
 * const postData = {
 *   id: '1',
 *   title: 'Sample Post',
 *   date: new Date(),
 *   bodyElements: [{ type: 'text', content: 'This is a sample post.' }]
 * };
 *
 * <Post className="custom-class" postData={postData} />
 */
export const Post = ({className = '', postData}: PostProps) => {

    const defaultJsonData: IPostBodyElement[] = [];

    return (
        <div className={classNames(cls.Post, {}, [className])}>
            <h1>{postData.title} </h1>
            {postData.date.toLocaleDateString()}

            <div style={{marginTop: '10px'}}>
                <ParsedPostBody jsonData={postData.bodyElements || defaultJsonData}/>
            </div>
        </div>
    );
};
