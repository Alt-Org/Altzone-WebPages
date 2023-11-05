import {memo} from "react";
import {NavItem} from "../../model/types/types";
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './NavElements.module.scss'
import {NavElement} from "../NavElement/NavElement";

interface NavElementProps{
    navElems: NavItem[];
    className?: string;
}

export const NavElements = memo(({navElems, className = ''}: NavElementProps)=>{
    return (
        <div className={classNames(cls.NavElements, {},[className] )}>
        {navElems.map((item)=>(
            <NavElement navElem={item} key={item.title}/>
        ))}
        </div>
    )
})