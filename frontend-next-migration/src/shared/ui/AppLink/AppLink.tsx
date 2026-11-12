import Link from 'next/link';
import { FC, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface AppLinkProps {
    to: string;
    className?: string;
    theme?: AppLinkTheme;
    unstyled?: boolean;
    isExternal?: boolean;
    children: ReactNode;
    'data-fancybox'?: string;
    role?: string;
    ariaLabel?: string;
    onClick?: () => void;
}

/**
 * `AppLink` is a reusable component that renders a link. It can handle both internal and external URLs.
 *
 * @param props - The properties for the `AppLink` component.
 *
 * @example
 * ```tsx
 * import { AppLink, AppLinkTheme } from "./AppLink";
 *
 * const MyComponent = () => (
 *   <div>
 *     <AppLink to="https://external.com" isExternal theme={AppLinkTheme.PRIMARY}>
 *       External Link
 *     </AppLink>
 *     <AppLink to="/internal-page" theme={AppLinkTheme.SECONDARY}>
 *       Internal Link
 *     </AppLink>
 *   </div>
 * );
 * ```
 */
export const AppLink: FC<AppLinkProps> = memo((props) => {
    const {
        to,
        className = '',
        children,
        theme = AppLinkTheme.PRIMARY,
        unstyled = false,
        isExternal,
        role = 'link',
        ariaLabel,
        'data-fancybox': dataFancybox,
    } = props;
    const { onClick } = props;
    // Components such as Button provide their own visual styles.
    const linkClassName = classNames(unstyled ? '' : cls.AppLink, {}, [
        className,
        unstyled ? '' : cls[theme],
    ]);

    if (isExternal) {
        return (
            <a
                href={to}
                className={linkClassName}
                target="_blank"
                rel="noopener noreferrer"
                data-fancybox={dataFancybox}
                role={role}
                aria-label={ariaLabel}
                onClick={onClick}
            >
                {children}
            </a>
        );
    }

    return (
        <Link
            href={to}
            role={role}
            aria-label={ariaLabel}
            className={linkClassName}
            data-fancybox={dataFancybox}
            onClick={onClick}
        >
            {children}
        </Link>
    );
});

AppLink.displayName = 'AppLink';
