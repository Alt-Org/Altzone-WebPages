import { Meta, StoryObj } from '@storybook/react';
import { CustomEditorCreateNew } from './CustomEditorCreateNew';
import './CustomEditor.module.scss'; // Adjust the path to your actual stylesheet

const meta: Meta<typeof CustomEditorCreateNew> = {
    title: 'shared/ui/CustomEditor/CustomEditorCreateNew',
    component: CustomEditorCreateNew,
    argTypes: {
        createNew: {
            action: 'createNew',
            description:
                'Mock callback function to simulate the creation of a new entity. Logs the entity data to the console.',
        },
        entityName: {
            control: 'text',
            description: 'The name of the entity to be created, used in the editor title.',
            defaultValue: 'Blog',
        },
    },
    args: {
        entityName: 'Blog',
    },
    parameters: {
        docs: {
            description: {
                component:
                    'The `CustomEditorCreateNew` component provides an interface for creating a new entity, with input fields for title, slug, description, and content. In this story, it uses a mock function to log the creation of a new entity without making actual changes.',
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {};

// Story with a mock createNew function for demonstration
export const WithMockCreateNew: Story = {
    args: {
        createNew: (data) => {
            // Simulating a creation action without actually creating anything
            //console.log('Mock creation of new entity:', data);
            alert(`New entity (mocked):\nTitle: ${data.title}\nSlug: ${data.slug}`);
            return Promise.resolve();
        },
    },
};
