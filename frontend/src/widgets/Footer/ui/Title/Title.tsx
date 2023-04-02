import cls from './Title.module.scss'
import {classNames} from "@/shared/lib/classNames/classNames";

interface TitleProps{
    className?: string;
    children: string;
}

export function Title ({className='',children}:TitleProps){
    return (
        <p className={classNames(cls.Title,{},[className])}>
            {children}
        </p>
    )
}