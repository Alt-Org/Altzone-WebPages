import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Container.module.scss';

type BlockElements = 'div' | 'section' | 'article' | 'header' | 'footer' | 'aside' | 'main' | 'nav';

interface ContainerProps {
    as?: BlockElements;
    className?: string;
    fluid?: boolean;
    children: ReactNode;
}

/**
 * `Container` is a flexible wrapper component that conditionally applies classes based on its props.
 * @example
 * ```tsx
 * <Container className="custom-class" fluid>
 *   This is a fluid container with a custom class.
 * </Container>
 *
 * <Container as="section">
 *   This is a container rendered as a <section> tag.
 * </Container>
 * ```
 * @param props
 */
export const Container = (props: ContainerProps) => {
    const { className = '', fluid = false, children, as: Component = 'div' } = props;
    const mods: Record<string, boolean> = {
        [cls.fluid]: fluid,
    } as Record<string, boolean>;
    return (
        <Component className={classNames(cls.Container, mods, [className])}>{children}</Component>
    );
};
