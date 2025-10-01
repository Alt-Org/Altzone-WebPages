import { Meta, StoryObj } from '@storybook/nextjs';
import { EditorForm } from './EditorForm';
import { ChangeEvent, FormEvent } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import { action } from 'storybook/actions';

const meta = {
    title: 'shared/ui/CustomEditor/EditorForm',
    component: EditorForm,
    argTypes: {
        entityName: {
            control: 'text',
            description: 'Name of the entity, displayed in titles and labels.',
            defaultValue: 'Blog',
        },
        title: {
            control: 'text',
            description: 'Title of the entity.',
            defaultValue: 'Sample Title',
        },
        slug: {
            control: 'text',
            description: 'Slug for the entity, typically a URL-friendly version of the title.',
            defaultValue: 'sample-title',
        },
        description: {
            control: 'text',
            description: 'Short description of the entity.',
            defaultValue: 'This is a short description of the blog post.',
        },
        content: {
            control: 'text',
            description: 'Main content of the entity in rich text format.',
            defaultValue: '<p>This is some rich content for the editor.</p>',
        },
        handleTitleChange: {
            action: 'Title changed',
            description: 'Callback function for title changes.',
        },
        handleSlugChange: {
            action: 'Slug changed',
            description: 'Callback function for slug changes.',
        },
        handleDescriptionChange: {
            action: 'Description changed',
            description: 'Callback function for description changes.',
        },
        handleContentChange: {
            action: 'Content changed',
            description: 'Callback function for content changes.',
        },
        handleSubmit: {
            action: 'Form submitted',
            description: 'Form submission handler.',
        },
    },
    args: {
        entityName: 'Blog',
        title: 'My Blog Post',
        slug: 'my-blog-post',
        description: 'A brief description of the blog post.',
        content: '<p>This is the main content for the blog post editor.</p>',
    },
    tags: ['autodocs'],
    parameters: {
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'light', value: '#ffffff' },
                { name: 'dark', value: '#333333' },
                { name: 'gray', value: '#dddddd' },
            ],
        },
        layout: 'centered',
        docs: {
            description: {
                component:
                    'The `EditorForm` component provides a structured form for editing and submitting content, including fields for title, slug, description, and rich text content using `ReactQuill`.',
            },
        },
    },
} satisfies Meta<typeof EditorForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        entityName: 'Blog',
        title: '',
        slug: '',
        description: '',
        content: '',
        handleTitleChange: (event: ChangeEvent<HTMLInputElement>) => {
            action(`Title changed: ${event.target.value}`);
        },
        handleSlugChange: (value: string) => {
            action(`Slug changed: ${value}`);
        },
        handleDescriptionChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
            action(`Description changed: ${event.target.value}`);
        },
        handleContentChange: (value: string) => {
            action(`Content changed: ${value}`);
        },
        handleSubmit: (event: FormEvent) => {
            event.preventDefault();
            action('Form submitted');
        },
    },
};
