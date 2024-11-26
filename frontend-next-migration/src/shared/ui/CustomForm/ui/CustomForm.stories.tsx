import { Meta, StoryObj } from '@storybook/react';
import MemoizedForm from './CustomForm';
import { useState } from 'react';
import { ClanLabel } from '@/entities/Clan/enum/clanLabel.enum';
import { Value } from 'sass';

const meta = {
    title: 'shared/ui/CustomForm',
    component: MemoizedForm,
    argTypes: {
        children: {
            control: 'text',
            description: 'The children of the form component.',
            defaultValue: 'Hello World',
        },
        className: {
            control: 'text',
            description: 'The class name for the form component.',
            defaultValue: '',
        },
        props: {
            control: 'object',
            description: 'The props for the form component.',
            defaultValue: {},
        },
    },
    args: {
        children: 'Hello World',
        className: '',
        props: {},
    },
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
                    'The `CustomForm` component provides a form element with custom styling and functionality.',
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        children: (
            <>
                <MemoizedForm.Header>Form Title</MemoizedForm.Header>
                <MemoizedForm.InputField
                    label="Email"
                    inputProps={{ type: 'email', placeholder: 'Enter your email' }}
                />
                <MemoizedForm.InputField
                    label="Username"
                    error="Required"
                    inputProps={{ placeholder: 'Enter your username' }}
                />
                <MemoizedForm.Checkbox label="I agree to the terms" />
                <MemoizedForm.Button type="submit">Submit</MemoizedForm.Button>
            </>
        ),
    },
};
export const FormHeader: Story = {
    args: {
        children: <MemoizedForm.Header>Form Title</MemoizedForm.Header>,
    },
};
export const FormButton: Story = {
    args: {
        children: <MemoizedForm.Button>Submit</MemoizedForm.Button>,
    },
};

export const FormInputField: Story = {
    args: {
        children: (
            <MemoizedForm.InputField
                label="Email"
                inputProps={{ type: 'email', placeholder: 'Enter your email' }}
            />
        ),
    },
};

export const FormCheckbox: Story = {
    args: {
        children: <MemoizedForm.Checkbox label="I agree to the terms" />,
    },
};

export const MultiSelectionDropdown: Story = {
    render: () => {
        const [selected, setSelected] = useState<{ label: any; value: any }[]>([]);

        return (
            <MemoizedForm.MultiSelectionDropdown
                label="Labels"
                options={ClanLabel}
                defaultSelected={{ ITSENÄISET: ClanLabel.ITSENÄISET }}
                maxSelections={5}
                value={selected}
                onSelectChange={(newSelection) => setSelected(newSelection)}
            />
        );
    },
};
