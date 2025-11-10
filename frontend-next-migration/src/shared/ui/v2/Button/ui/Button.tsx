// Custom Button component which extends the default HTML button element
// comes with two pre-defined (css) themes: 'primary' and 'outline'
import React from 'react';
import cls from './Button.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

export enum ButtonTheme {
    PRIMARY = 'primary',
    OUTLINE = 'outline',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    path?: string;
    isExternal?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}

/**
 * A customizable Button component with theme support.
 *
 * @param {ButtonProps} props - The properties for the Button component.
 * @param {string} [props.className] - Additional class name(s) for the button.
 * @param {ButtonTheme} [props.theme=ButtonTheme.PRIMARY] - Theme for the button.
 * @param {string} [props.path] - Optional path for link navigation.
 * @param {boolean} [props.disabled=false] - Whether or not the button should be disabled.
 * @param {boolean} [props.isExternal=false] - Whether or not the link is external.
 * @param {React.ReactNode} props.children - The content of the button.
 * @returns {JSX.Element} The rendered Button component.
 *
 * @example
 * // Basic usage
 * <Button>Click me</Button>
 *
 * @example
 * // With custom theme and a link
 * <Button theme={ButtonTheme.OUTLINE} path="/some-path">Outline Button</Button>
 */
export const Button: React.FC<ButtonProps> = (props) => {
    const {
        className = '',
        children,
        theme = ButtonTheme.PRIMARY,
        disabled = false,
        isExternal = false,
        ...otherProps
    } = props;

    return props.path ? (
        <AppLink
            to={props.path}
            isExternal={isExternal}
            className={classNames(cls.Button, {}, [
                className,
                cls[theme],
                disabled ? cls.disabled : '',
            ])}
        >
            {children}
        </AppLink>
    ) : (
        <button
            className={classNames(cls.Button, {}, [
                className,
                cls[theme],
                disabled ? cls.disabled : '',
            ])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
};
