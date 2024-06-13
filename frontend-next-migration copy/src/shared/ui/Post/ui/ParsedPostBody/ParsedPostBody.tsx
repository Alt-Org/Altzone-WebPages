import { FC, ReactNode } from 'react';
import { IPostBodyElement } from "../../model/types";
import Image from "next/image";

interface ParsedPostBodyProps {
    jsonData: IPostBodyElement[];
}

export const ParsedPostBody: FC<ParsedPostBodyProps> = ({ jsonData }) => {
    const parseJSON = (json: IPostBodyElement[]): ReactNode[] => {
        return json.map((item, index) => {
            switch (item.type) {
                case 'image':
                    return (
                        <Image
                            key={index}
                            src={item.url}
                            alt={item.alt}
                            width={"1000"}
                            height={"1000"}
                            style={{
                                display: 'block',
                                width: item.widthPx ? item.widthPx : 'auto',
                                height: item.heightPx ? item.heightPx : 'auto',
                            }}
                        />
                    );
                case 'text':

                    let content = item.content;

                    const linkRegex = /(?:https?|ftp):\/\/[\n\S]+/g;
                    content = content.replace(linkRegex, (match) => (
                        `<a href="${match}" target="_blank" rel="noopener noreferrer"><b>${match}</b></a>`
                    ));


                    // const boldRegex = /\*\*(.*?)\*\*/g;
                    // const contentWithBold = item.content.replace(boldRegex, (match, p1) => (
                    //     `<b>${p1}</b>`
                    // ));
                    // return <p key={index} dangerouslySetInnerHTML={{ __html: contentWithBold }} />;
                    return <div key={index} dangerouslySetInnerHTML={{__html: content}} />;
                default:
                    return null;
            }
        });
    };

    return <div>{parseJSON(jsonData)}</div>;
};
