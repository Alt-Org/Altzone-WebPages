import { classNames } from "@/shared/lib/classNames/classNames";
import {ButtonHTMLAttributes, FC} from "react";
import cls from "./Button.module.scss";


/**
 * Module containing a React Button component with customizable themes, sizes, and square styling.
 * @module Button
 */


export enum ButtonTheme {
    PRIMARY = "",
    CLEAR = "clear",
    CLEAR_INVERTED = "clearInverted",
    OUTLINE = "outline",
    BACKGROUND = "background",
    BACKGROUND_INVERTED = "backgroundInverted",

}

export enum ButtonSize {
    M = "sizeM",
    L = "sizeL",
    XL = "sizeXL",
}


/**
 * Props for the Button component.
 * @typedef {Object} ButtonProps
 * @property {string} [className=""] - Additional class name(s) for the button.
 * @property {ButtonTheme} [theme=ButtonTheme.PRIMARY] - Theme for the button.
 * @property {boolean} [square=false] - Whether or not the button should be styled with square corners.
 * @property {ButtonSize} [size=ButtonSize.M] - Size for the button.
 * @property {boolean} [disabled=false] - Whether or not the button should be disabled.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className = "",
        children,
        theme = ButtonTheme.PRIMARY,
        square = false,
        disabled = false,
        size = ButtonSize.M,
        ...otherProps
    } = props;

    const mods: Record<string, boolean> = {
        [cls.square]: square,
        [cls.disabled]: disabled,
    } as Record<string, boolean>;

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
};
