import cls from './Title.module.scss'
import {classNames} from "@/shared/lib/classNames/classNames";
import {memo} from "react";

interface Props {
    className?: string;
    title: string;
}

export const Title = memo(( props: Props)=>{

    const {
        title,
        className = ""
    } = props;



    return (
        <p className={classNames(cls.Title,{},[className])}>
            {/*{t("FooterTitle")}*/}
            {title}
        </p>
    )
})

Title.displayName = "Footer-title";