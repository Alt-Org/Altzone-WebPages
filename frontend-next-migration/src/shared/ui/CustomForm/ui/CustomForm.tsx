import React, {
    ReactNode,
    HTMLAttributes,
    ButtonHTMLAttributes,
    FC,
    NamedExoticComponent,
    memo,
    DetailedHTMLProps,
    InputHTMLAttributes,
} from 'react';
import { Button as CustomButton, ButtonTheme } from '@/shared/ui/Button/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CustomForm.module.scss';

/**
 * Header component for displaying a heading inside the form.
 *
 * @param {HeaderProps} props - The properties for the header component.
 * @returns {JSX.Element} - The rendered header element.
 *
 * @example
 * <Form.Header>Hello World</Form.Header>
 */
interface HeaderProps {
    children: ReactNode;
}

function Header({ children, ...props }: HeaderProps) {
    return <h1 {...props}>{children}</h1>;
}

/**
 * InputField component for rendering a labeled input field with error handling.
 *
 * @param {InputFieldProps} props - The properties for the input field.
 * @returns {JSX.Element} - The rendered input field component.
 *
 * @example
 * <Form.InputField label="Username" error="Required" inputProps={{ placeholder: "Enter your username" }} />
 */
type InputFieldProps = {
    label: string;
    error?: any;
    inputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
};

function InputField({ label, error, inputProps }: InputFieldProps) {
    const inputId = inputProps?.id || `input-${label}`;
    return (
        <div className={cls.field}>
            <label htmlFor={inputId}>{label}</label>
            <input
                id={inputId}
                {...inputProps}
            />
            {error && (
                <p
                    role="alert"
                    className={cls.error}
                >
                    {error}
                </p>
            )}
        </div>
    );
}

type CheckboxProps = {
    label: string;
    error?: any;
    inputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
};

/**
 * Checkbox component for rendering a labeled checkbox with error handling.
 *
 * @param {CheckboxProps} props - The properties for the checkbox.
 * @returns {JSX.Element} - The rendered checkbox component.
 *
 * @example
 * <Form.Checkbox label="I agree" error="You must agree" inputProps={{ required: true }} />
 */
function Checkbox({ label, error, inputProps }: CheckboxProps) {
    const inputId = inputProps?.id || `checkbox-${label}`;
    return (
        <div className={cls.field}>
            <label htmlFor={inputId}>
                <input
                    id={inputId}
                    type="checkbox"
                    {...inputProps}
                />
                {label}
            </label>
            {error && (
                <p
                    role="alert"
                    className={cls.error}
                >
                    {error}
                </p>
            )}
        </div>
    );
}

/**
 * Button component for rendering a button with the graffiti theme.
 *
 * @param {ButtonProps} props - The properties for the button.
 * @returns {JSX.Element} - The rendered button component.
 *
 * @example
 * <Form.Button type="submit">Submit</Form.Button>
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

function Button({ children, ...props }: ButtonProps) {
    return (
        <CustomButton
            theme={ButtonTheme.Graffiti}
            className={cls.submit}
            {...props}
        >
            {children}
        </CustomButton>
    );
}

interface IFormProps extends HTMLAttributes<HTMLFormElement> {}

interface MemoizedFormCompose {
    Button: typeof Button;
    Header: typeof Header;
    InputField: typeof InputField;
    Checkbox: typeof Checkbox;
}

/**
 * Form component for rendering a form with its children.
 * @param children
 * @param className
 * @param props
 * @returns {JSX.Element} - The rendered form component.
 * @example
 <Form className="my-form">
    <Form.Header>Title</Form.Header>
    <Form.InputField label="Email" />
    <Form.Button type="submit">Submit</Form.Button>
 </Form>
 */
const BaseForm: FC<IFormProps> = ({
    children,
    className = '',
    ...props
}: IFormProps): JSX.Element => (
    <form
        {...props}
        className={classNames(cls.Form, {}, [className])}
    >
        {children}
    </form>
);

const MemoizedForm = memo(BaseForm) as NamedExoticComponent<IFormProps> & MemoizedFormCompose;

MemoizedForm.Button = Button;
MemoizedForm.Header = Header;
MemoizedForm.InputField = InputField;
MemoizedForm.Checkbox = Checkbox;

export default MemoizedForm;
