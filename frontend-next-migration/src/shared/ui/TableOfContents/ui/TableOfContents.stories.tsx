import { Meta, StoryObj } from '@storybook/nextjs';
import TableOfContents from './TableOfContents';
import { useState } from 'react';

const meta = {
    title: 'shared/ui/TableOfContents',
    component: TableOfContents,
    argTypes: {
        sections: {
            control: 'object',
            description: 'Array of section objects with `id` and `label`.',
            defaultValue: [],
        },
    },
    args: {
        sections: [],
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
        docs: {
            description: {
                component:
                    '`NavbarSide` is component that displays a navigation sidebar with clickable section labels',
            },
        },
    },
} satisfies Meta<typeof TableOfContents>;
export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
    const [activeSection, setActiveSection] = useState(args.activeSection || 'section1');

    return (
        <>
            <div style={{ display: 'flex', height: '50vh' }}>
                <TableOfContents
                    {...args}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />
            </div>

            {/* Mock sections to scroll through */}
            <div
                id="section1"
                style={{ height: '30vh', border: '1px solid black', padding: '1rem' }}
            >
                Section 1 Content
            </div>
            <div
                id="section2"
                style={{ height: '30vh', border: '1px solid black', padding: '1rem' }}
            >
                Section 2 Content
            </div>
            <div
                id="section3"
                style={{ height: '30vh', border: '1px solid black', padding: '1rem' }}
            >
                Section 3 Content
            </div>
            <div
                id="section4"
                style={{ height: '30vh', border: '1px solid black', padding: '1rem' }}
            >
                Section 4 Content
            </div>
        </>
    );
};

// Define Example story
export const Example: Story = {
    render: Template,
    args: {
        sections: [
            { id: 'section1', label: 'Section 1' },
            { id: 'section2', label: 'Section 2' },
            { id: 'section3', label: 'Section 3' },
            { id: 'section4', label: 'Section 4' },
        ],
    },
};
