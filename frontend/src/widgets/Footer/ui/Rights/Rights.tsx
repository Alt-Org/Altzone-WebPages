import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Rights.module.scss'

interface TitleProps{
    className?: string;
}
const currentYear = new Date().getFullYear();
const companyName = 'Psyche\'s Royale Gaming ry';

export function Rights ({className=''}:TitleProps){
    return (
        <p className={classNames(cls.Rights,{},[className])}>
            <span className={cls.copySymbol}>&copy;</span> {currentYear} {companyName}
        </p>
    )
}