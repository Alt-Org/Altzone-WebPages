import cls from './Title.module.scss'
import {classNames} from "@/shared/lib/classNames/classNames";
import {FooterTitle} from "../../model/data/text";
import {memo} from "react";

interface TitleProps{
    className?: string;
}

export const Title = memo(({className=''}:TitleProps)=>{
    return (
        <p className={classNames(cls.Title,{},[className])}>
            {FooterTitle}
        </p>
    )
})