import {memo} from "react";
import {NavItem} from "../../model/types/types";
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './NavElement.module.scss'
import {AppLink} from "@/shared/ui/AppLink/AppLink";

interface NavElementProps{
    navElem:NavItem;
    className?: string;
}

export const NavElement = memo(({navElem, className = ''}: NavElementProps)=>{
    return (
        <div className={classNames(cls.NavElement, {}, [className])}>
            <AppLink to={navElem.link} isExternal={navElem.isExternal}>
                <h3>{navElem.title}</h3>
                <p>{navElem.body}</p>
            </AppLink>

        </div>
    )
})