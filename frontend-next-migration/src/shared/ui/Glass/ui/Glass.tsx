import { type ReactNode, ElementType } from 'react';
import clsx from 'clsx';
import styles from './Glass.module.scss';

export type GlassProps<T extends ElementType = 'div'> = {
    as?: T;
    children: ReactNode;
    className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export const Glass = <T extends ElementType = 'div'>({
    as,
    children,
    className,
    ...props
}: GlassProps<T>) => {
    const Component = as || 'div';

    return (
        <Component
            className={clsx(styles.Glass, className)}
            {...props}
        >
            {children}
        </Component>
    );
};
