import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Container.module.scss'
import {ReactNode} from "react";


interface ContainerProps {
    className?: string;
    fluid?: boolean;
    children: ReactNode;
}

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
