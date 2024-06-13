import cls from "./CustomEditor.module.scss";
import parse from "html-react-parser";

type Props = {
    title: string;
    slug: string;
    description: string;
    content: string;
    entityName: string
};

export function EditorPreview({ title, slug, description, content, entityName }: Props) {

    return (
        <div className={cls.editorPreview}>
            <h2 className={cls.previewTitle}> {entityName} View</h2>
            <div className={cls.inputContainer}>
                <h2 className={cls.label}>{entityName} Title</h2>
                <div className={cls.input}>
                    <p>{title}</p>
                </div>
            </div>
            <div className={cls.inputContainer}>
                <h2 className={cls.label}>{entityName} Slug</h2>
                <div className={cls.input}>
                    <p>{slug}</p>
                </div>
            </div>
            <div className={cls.inputContainer}>
                <h2 className={cls.label}>{entityName} Description</h2>
                <p>{description}</p>
            </div>
            <div className={cls.inputContainer}>
                <h2 className={cls.label}>{entityName} Content</h2>

                {/*<div dangerouslySetInnerHTML={{__html: content}}/>*/}
                {parse(content)}
            </div>
        </div>
    );
}

{/*// @ts-ignore*/
}