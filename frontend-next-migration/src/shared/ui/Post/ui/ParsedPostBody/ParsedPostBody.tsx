import Image from 'next/image';
import { FC, ReactNode } from 'react';
import { IPostBodyElement } from '../../model/types';

interface ParsedPostBodyProps {
    jsonData: IPostBodyElement[];
}

/**
 * Component to parse and render JSON data for post body elements.
 *
 * @param props - The properties for the ParsedPostBody component.
 * @param props.jsonData - The JSON data to be parsed and rendered.
 *
 * @example
 * const jsonData = [
 *   { type: 'text', content: 'This is a text element.' },
 *   { type: 'image', url: '/path/to/image.jpg', alt: 'An image', widthPx: 500, heightPx: 300 }
 * ];
 *
 * <ParsedPostBody jsonData={jsonData} />
 */
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
                            width={'1000'}
                            height={'1000'}
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
                    content = content.replace(
                        linkRegex,
                        (match) =>
                            `<a href="${match}" target="_blank" rel="noopener noreferrer"><b>${match}</b></a>`,
                    );

                    return (
                        <div
                            key={index}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    );
                default:
                    return null;
            }
        });
    };

    return <div>{parseJSON(jsonData)}</div>;
};
