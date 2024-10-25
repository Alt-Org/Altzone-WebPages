import { Meta, StoryObj } from '@storybook/react';
import MemoizedForm, { Header, InputField, Checkbox, Button } from './CustomForm';
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

export const Default: Story = {
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

export const FormButton: Story = {
    args: {
        children: <Button>Submit</Button>,
    },
};
