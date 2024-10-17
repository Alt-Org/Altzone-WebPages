import { ChangeEvent, FormEvent, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import cls from "./CustomEditor.module.scss";

type Props = {
    entityName: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSlugChange: (value: string) => void;
    handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    handleContentChange: (value: string) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};
export function EditorForm({
                               title,
                               slug,
                               description,
                               content,
                               handleTitleChange,
                               handleSlugChange,
                               handleDescriptionChange,
                               handleContentChange,
                               handleSubmit,
                               entityName
                           }: Props) {
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4 ,5, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote", "code", "link"],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [
                        // "image", "video"
                    ],
                ],
            },
            clipboard: {
                matchVisual: false,
            },
        }),
        []
    );

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "image",
        "video",
        "code-block",
        "color",
        "background",
        "font",
        "code",
        "align",
    ];

    return (
        <div className={cls.blogEditor}>
            <h2 className={cls.editorTitle}> {entityName} Editor</h2>
            <form onSubmit={handleSubmit} className={cls.form}>
                <div className={cls.inputContainer}>
                    <label htmlFor="title" className={cls.label}>
                        {entityName} Title
                    </label>
                    <input
                        onChange={handleTitleChange}
                        type="text"
                        value={title}
                        name="title"
                        id="title"
                        autoComplete="given-name"
                        className={cls.input}
                        placeholder="Type the Course title"
                    />
                </div>
                <div className={cls.inputContainer}>
                    <label htmlFor="slug" className={cls.label}>
                        {entityName} Slug
                    </label>
                    <input
                        onChange={(event) => handleSlugChange(event.target.value)}
                        type="text"
                        value={slug}
                        name="slug"
                        id="slug"
                        autoComplete="slug"
                        className={cls.input}
                        placeholder="Type the Course title"
                    />
                </div>
                <div className={cls.inputContainer}>
                    <label htmlFor="description" className={cls.label}>
                        {entityName} Description
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        onChange={handleDescriptionChange}
                        value={description}
                        className={cls.textarea}
                        placeholder="Write your thoughts here..."
                    />
                </div>
                <div className={cls.inputContainer}>
                    <label htmlFor="content" className={cls.label}>
                        {entityName} Content
                    </label>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={handleContentChange}
                        modules={modules}
                        formats={formats}
                        className={cls.reactQuill}
                    />
                </div>
                <button type="submit" className={cls.submitButton}>
                    <span>Submit</span>
                </button>
            </form>
        </div>
    );
}
