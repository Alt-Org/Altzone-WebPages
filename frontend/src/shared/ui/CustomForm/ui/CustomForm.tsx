import React, {
    ReactNode,
    HTMLAttributes,
    ButtonHTMLAttributes, FC, NamedExoticComponent, memo, DetailedHTMLProps, InputHTMLAttributes,
} from 'react';
import cls from "./CustomForm.module.scss";
import {Button as CustomButton, ButtonTheme} from "@/shared/ui/Button/Button";
import {classNames} from "@/shared/lib/classNames/classNames";


interface HeaderProps {
    children: ReactNode;
}

function Header({ children, ...props }: HeaderProps) {
    return <h2 {...props}>{children}</h2>;
}


type InputFieldProps = {
    label: string,
    error?: any
    inputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}


function InputField({ label, error, inputProps }: InputFieldProps) {
    return (
        <div>
            <span>{label}</span>
            <input {...inputProps}/>
            <p>{ error && error}</p>
        </div>
    );
};



interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

function Button({ children, ...props }: ButtonProps) {
    return <CustomButton theme={ButtonTheme.Graffiti} className={cls.submit} {...props}>{children}</CustomButton>;
}

interface IFormProps extends HTMLAttributes<HTMLFormElement> {}
interface MemoizedFormCompose {
    Button: typeof Button;
    Header: typeof Header;
    InputField: typeof InputField;
}

const BaseForm: FC<IFormProps> = ({ children, className='', ...props }) => (
    <form {...props} className={classNames(cls.Form, {}, [className])}>
        {children}
    </form>
);

const MemoizedForm = memo(BaseForm) as NamedExoticComponent<IFormProps> & MemoizedFormCompose;

MemoizedForm.Button = Button;
MemoizedForm.Header = Header;
MemoizedForm.InputField = InputField;


export default MemoizedForm;
