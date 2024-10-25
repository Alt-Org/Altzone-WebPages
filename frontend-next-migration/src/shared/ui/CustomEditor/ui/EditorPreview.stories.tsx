import { Meta, StoryObj } from '@storybook/react';
import { EditorPreview } from './EditorPreview';
import './CustomEditor.module.scss';

const meta = {
    title: 'shared/ui/CustomEditor/EditorPreview',
    component: EditorPreview,
    argTypes: {
        title: {
            control: 'text',
            description: 'The title of the entity being previewed.',
            defaultValue: 'Sample Title',
        },
        slug: {
            control: 'text',
            description: 'The slug of the entity, used for URL purposes.',
            defaultValue: 'sample-title',
        },
        description: {
            control: 'text',
            description: 'A brief description of the entity.',
            defaultValue: 'This is a sample description.',
        },
        content: {
            control: 'text',
            description: 'The main content of the entity, which can contain HTML.',
            defaultValue: '<p>This is the sample content.</p>',
        },
        entityName: {
            control: 'text',
            description: 'The name of the entity being previewed.',
            defaultValue: 'SampleEntity',
        },
    },
    args: {
        title: 'Sample Title',
        slug: 'sample-title',
        description: 'This is a sample description.',
        content: '<p>This is the sample content.</p>',
        entityName: 'SampleEntity',
    },
    parameters: {
        docs: {
            description: {
                component:
                    'The `EditorPreview` component displays a preview of the entity, including its title, slug, description, and content. It renders the content using `html-react-parser` to interpret HTML strings.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof EditorPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
    args: {
        title: 'Sample Title',
        slug: 'sample-title',
        description: 'This is a sample description.',
        content: '<p>This is the sample content.</p>',
        entityName: 'SampleEntity',
    },
};
