import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Rights.module.scss'
import {CurrentYear, CompanyName} from "../../model/data/text";
import {memo} from "react";


interface TitleProps{
    className?: string;
}

export const Rights = memo(({className=''}:TitleProps)=>{
    return (
        <p className={classNames(cls.Rights,{},[className])}>
            <span className={cls.copySymbol}>&copy;</span> {CurrentYear} {CompanyName}
        </p>
    )
})

Rights.displayName = "Footer-Rights";