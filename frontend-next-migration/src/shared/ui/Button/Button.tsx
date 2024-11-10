import { ButtonHTMLAttributes, forwardRef, LegacyRef, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

/**
 * Module containing a React Button component with customizable themes, sizes, and square styling.
 * @module Button
 */

export enum ButtonTheme {
    PRIMARY = '',
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
    Graffiti = 'graffiti',
}

export enum ButtonSize {
    M = 'sizeM',
    L = 'sizeL',
    XL = 'sizeXL',
    XXL = 'sizeXXL',
    XXXL = 'sizeXXXL',
}

/**
 * Props for the Button component.
 * {Object} ButtonProps
 * @property {string} [className=""] - Additional class name(s) for the button.
 * @property {ButtonTheme} [theme=ButtonTheme.PRIMARY] - Theme for the button.
 * @property {boolean} [square=false] - Whether or not the button should be styled with square corners.
 * @property {ButtonSize} [size=ButtonSize.M] - Size for the button.
 * @property {boolean} [disabled=false] - Whether or not the button should be disabled.
 * @property {boolean} [withScalableLink=false] - Whether or not the button should be with link css.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    size?: ButtonSize;
    square?: boolean;
    withScalableLink?: boolean;
    disabled?: boolean;
    ref?: LegacyRef<HTMLButtonElement>;
}

/**
 * Button component that can be customized with themes, sizes, square styling, and more.
 *
 * @component
 * @example
 * // Basic usage
 * <Button>Click me</Button>
 *
 * @example
 * // With custom theme and size
 * <Button theme={ButtonTheme.CLEAR} size={ButtonSize.XL}>Clear Button</Button>
 *
 * @example
 * // Disabled button
 * <Button disabled>Disabled Button</Button>
 *
 * @param {Object} props - Properties of the Button component.
 * @param {string} [props.className=""] - Additional class name(s) for the button.
 * @param {ButtonTheme} [props.theme=ButtonTheme.PRIMARY] - Theme for the button.
 * @param {boolean} [props.square=false] - Whether the button should be styled with square corners.
 * @param {ButtonSize} [props.size=ButtonSize.M] - Size for the button.
 * @param {boolean} [props.disabled=false] - Whether the button should be disabled.
 * @param {boolean} [props.withScalableLink=false] - Whether the button should have scalable link styling.
 * @param {React.LegacyRef<HTMLButtonElement>} [props.ref] - Reference to the button element.
 * @param {React.ReactNode} [props.children] - Child nodes of the button.
 * @returns {JSX.Element} The rendered Button component.
 */
export const Button = memo(
    forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
        const {
            className = '',
            children,
            theme = ButtonTheme.PRIMARY,
            square = false,
            disabled = false,
            withScalableLink = false,
            size = ButtonSize.M,
            ...otherProps
        } = props;

        const mods: Record<string, boolean> = {
            [cls.withScalableLink]: withScalableLink,
            [cls.square]: square,
            [cls.disabled]: disabled,
        };

        return (
            <button
                ref={ref}
                type="button"
                className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])}
                disabled={disabled}
                {...otherProps}
            >
                {children}
            </button>
        );
    }),
);

Button.displayName = 'Button';
