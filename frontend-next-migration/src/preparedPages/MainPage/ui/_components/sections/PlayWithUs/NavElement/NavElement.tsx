'use client'
import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import cls from "./NavElement.module.scss";

export type NavItem = {
    title?: string;
    body?: string;
    link: string;
    isExternal: boolean;
};


interface NavElementProps{
    navElem:NavItem;
    className?: string;
}

export const NavElement = memo(({navElem, className = ''}: NavElementProps)=>{

    return (
        <div className={classNames(cls.NavElement, {}, [className])}>

            <AppLink to={navElem.link} isExternal={navElem.isExternal}>
                {
                    navElem?.title &&  <h3>{navElem.title}</h3>
                }

                {
                    navElem?.body &&  <p>{navElem.body}</p>
                }

            </AppLink>

        </div>
    )
});

NavElement.displayName = "DescriptionWithNav-NavElement";