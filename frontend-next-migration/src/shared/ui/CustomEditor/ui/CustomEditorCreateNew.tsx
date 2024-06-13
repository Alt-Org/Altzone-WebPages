'use client'
import cls from "./CustomEditor.module.scss"
import { generateSlug } from "../lib/generateSlug";
import { ChangeEvent, FormEvent, useState } from "react";
import {EditorForm} from "./EditorForm"
import {EditorPreview} from "./EditorPreview";



type Props = {
    createNew?: (
        data: {
            title: string,
            slug: string,
            description: string,
            content: string,
        },
    ) => Promise<void>;
    entityName: string;
};

export const CustomEditorCreateNew = ({createNew, entityName = 'Blog'}: Props) => {

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");

    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        const newTitle = e.target.value;
        setTitle(newTitle);
        const autoSlug = generateSlug(newTitle);
        setSlug(autoSlug);
    }

    function handleSlugChange(value: string) {
        setSlug(value);
    }

    function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setDescription(e.target.value);
    }

    function handleContentChange(value: string) {
        setContent(value);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newBlog = {
            title,
            slug,
            description,
            content,
        };
        if(createNew) await createNew(newBlog);
    }

    return (
        <div className={cls.editorContainer}>
            <h2 className={cls.editorHeader}>Create {entityName}</h2>
            <div className={cls.editorGrid}>
                <EditorForm
                    entityName={entityName}
                    title={title}
                    slug={slug}
                    description={description}
                    content={content}
                    handleTitleChange={handleTitleChange}
                    handleSlugChange={handleSlugChange}
                    handleDescriptionChange={handleDescriptionChange}
                    handleContentChange={handleContentChange}
                    handleSubmit={handleSubmit}
                />
                <EditorPreview
                    entityName={entityName}
                    title={title}
                    slug={slug}
                    description={description}
                    content={content}
                />
            </div>
        </div>
    );
}



