import cls from './Title.module.scss'
import {classNames} from "@/shared/lib/classNames/classNames";
import {memo} from "react";
import {useParams} from "next/navigation";
import {useClientTranslation} from "@/shared/i18n";

interface TitleProps{
    className?: string;
}

export const Title = memo(({className=''}:TitleProps)=>{

    const params = useParams();
    const lng = params.lng as string;
    const {t} = useClientTranslation(lng, "footer");

    return (
        <p className={classNames(cls.Title,{},[className])}>
            {t("FooterTitle")}
        </p>
    )
})

Title.displayName = "Footer-title";