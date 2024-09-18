import cls from "./CustomEditor.module.scss";
import parse from "html-react-parser";

type Props = {
    title: string;
    slug: string;
    description: string;
    content: string;
    entityName: string
};

/**
 * Displays a preview of the entity with its details.
 *
 * @param {Props} props - The props for the `EditorPreview` component.
 * @returns JSX.Element - The rendered `EditorPreview` component.
 *
 * @example
 * ```tsx
 * <EditorPreview
 *   title="Sample Title"
 *   slug="sample-title"
 *   description="This is a sample description."
 *   content="<p>This is the sample content.</p>"
 *   entityName="SampleEntity"
 * />
 * ```
 */
export function EditorPreview({title, slug, description, content, entityName}: Props) {
    return (
        <div className={cls.editorPreview}>
            <h2 className={cls.previewTitle}>{entityName} View</h2>
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
                {parse(content)}
            </div>
        </div>
    );
}