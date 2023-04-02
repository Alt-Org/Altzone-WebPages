import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Container.module.scss'
import {memo, ReactNode} from "react";


interface ContainerProps {
    className?: string;
    fluid?: boolean;
    children: ReactNode;
}

export const Container = memo(({className='', fluid = false ,children}: ContainerProps) => {

    const mods: Record<string, boolean> = {
        [cls.fluid]: fluid,
    } as Record<string, boolean>;

    return (
        <div className={classNames(cls.Container,mods,[className])}>
            {children}
        </div>
    );
});
