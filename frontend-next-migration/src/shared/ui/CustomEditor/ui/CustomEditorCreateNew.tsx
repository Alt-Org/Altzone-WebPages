'use client'
import { ChangeEvent, FormEvent, useState } from "react";
import { generateSlug } from "../lib/generateSlug";
import cls from "./CustomEditor.module.scss";
import { EditorForm } from "./EditorForm";
import { EditorPreview } from "./EditorPreview";

type Props = {
    /**
     * A callback function to create a new entity.
     * @param data - The data object containing title, slug, description, and content of the new entity.
     */
    createNew?: (
        data: {
            title: string,
            slug: string,
            description: string,
            content: string,
        },
    ) => Promise<void>;

    /**
     * The name of the entity to be created.
     */
    entityName: string;
};

/**
 * Custom editor component for creating a new entity.
 *
 * @param createNew - Optional callback function to create a new entity.
 * @param entityName - The name of the entity being created.
 *
 * @example
 * ```tsx
 * const createNewBlog = async (data: { title: string, slug: string, description: string, content: string }) => {
 *     // Perform the creation logic here
 * };
 *
 * <CustomEditorCreateNew createNew={createNewBlog} entityName="Blog" />
 * ```
 */
export const CustomEditorCreateNew = ({createNew, entityName = 'Blog'}: Props) => {

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");

    /**
     * Handles the change event for the title input field.
     * Updates the title state and generates a slug.
     *
     * @param e - The change event.
     */
    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        const newTitle = e.target.value;
        setTitle(newTitle);
        const autoSlug = generateSlug(newTitle);
        setSlug(autoSlug);
    }

    /**
     * Handles the change event for the slug input field.
     *
     * @param value - The new slug value.
     */
    function handleSlugChange(value: string) {
        setSlug(value);
    }

    /**
     * Handles the change event for the description textarea field.
     *
     * @param e - The change event.
     */
    function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setDescription(e.target.value);
    }

    /**
     * Handles the change event for the content input field.
     *
     * @param value - The new content value.
     */
    function handleContentChange(value: string) {
        setContent(value);
    }

    /**
     * Handles the form submission event.
     * Creates a new entity with the provided data.
     *
     * @param e - The form submission event.
     */
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newBlog = {
            title,
            slug,
            description,
            content,
        };
        if (createNew) await createNew(newBlog);
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


