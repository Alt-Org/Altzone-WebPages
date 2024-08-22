import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Container.module.scss'
import {ReactNode} from "react";


interface ContainerProps {
    className?: string;
    fluid?: boolean;
    children: ReactNode;
}

/**
 * `Container` is a flexible wrapper component that conditionally applies classes based on its props.
 * @param {string} className - Additional classes to apply to the container.
 * @param fluid
 * @param children
 * @example ```
 <Container className="custom-class" fluid>
 This is a fluid container with a custom class.
 </Container>

 <Container>
 This is a default container.
 </Container>
 ```
 */
export const Container = ({className='', fluid = false ,children}: ContainerProps) => {

    const mods: Record<string, boolean> = {
        [cls.fluid]: fluid,
    } as Record<string, boolean>;

    return (
        <div className={classNames(cls.Container,mods,[className])}>
            {children}
        </div>
    );
};
