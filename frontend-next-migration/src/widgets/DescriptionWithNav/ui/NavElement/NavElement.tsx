import {memo} from "react";
import {NavItem} from "../../model/types/types";
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './NavElement.module.scss'
import {AppLink} from "@/shared/ui/AppLink/AppLink";
import {useParams} from "next/navigation";
import {useClientTranslation} from "@/shared/i18n";

interface NavElementProps{
    navElem:NavItem;
    className?: string;
}

export const NavElement = memo(({navElem, className = ''}: NavElementProps)=>{
    const params = useParams();
    const lng = params.lng as string;
    const {t} =  useClientTranslation(lng, "description-with-nav");

    return (
        <div className={classNames(cls.NavElement, {}, [className])}>

            <AppLink to={navElem.link} isExternal={navElem.isExternal}>
                <h3>{t(`${navElem.title}`)}</h3>
                <p>{t(`${navElem.body}`)}</p>
            </AppLink>

        </div>
    )
});

NavElement.displayName = "DescriptionWithNav-NavElement";