/**
 * @fileoverview A customizable sidebar component that can be expanded or collapsed.
 */

import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./Sidebar.module.scss";
import {SidebarItemType} from "@/shared/ui/Sidebar/model/items";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {SidebarItem} from "@/shared/ui/Sidebar/ui/SidebarItem/SidebarItem";


interface SidebarProps {
    buttonClassName?: string;
    sidebarItemsList: SidebarItemType[];
    side? : 'left'| 'right'
    closeOnClickOutside?: boolean;
}

export const Sidebar = ({ buttonClassName = '',  sidebarItemsList , side = 'left' ,closeOnClickOutside = false}: SidebarProps) => {

    const [isCollapsed, setIsCollapsed] = useState(true);

        const handleBurgerButtonClick = () => {
        setIsCollapsed((prevState) => !prevState);
    };

    const currentButton = isCollapsed ? '☰' : 'Х'

    /**
     * An object containing CSS classes to be applied to the Sidebar
     * based on the component's state and properties. This is used to
     * control the visual appearance of the Sidebar, such as whether
     * it is expanded or collapsed, and if it is positioned on the left
     * or right side of the screen.
     */
    const mods = {
        [cls.collapsed]: isCollapsed,
        [cls.expanded]: !isCollapsed,
        [cls.left] : side === 'left',
        [cls.right] : side === 'right',
    }

    const buttonMods = {
        [cls.collapsedButton]: isCollapsed,
        [cls.expandedButton]: !isCollapsed
    }


    /**
     * A ref for the Sidebar component's root HTMLDivElement.
     * It is used to check if a click event occurred inside or outside the Sidebar
     * in the handleClickOutside function. If the click event happened outside
     * the Sidebar and the closeOnClickOutside prop is set to true, the Sidebar
     * will collapse.
     *
     */
    const sidebarRef = useRef<HTMLDivElement | null>(null);


    /**
     * Event handler for handling clicks outside the Sidebar component.
     * If the click is outside the Sidebar and not on the toggle button(div with classname button),
     * or some another button(e.g scrollUp Button),
     * it will collapse the Sidebar if `closeOnClickOutside` prop is set to true.
     */
    const handleClickOutside = (event: MouseEvent) => {
        const clickedButton = (event.target as HTMLElement).tagName === 'BUTTON' || (event.target as HTMLElement).classList.contains(cls.button);
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && !clickedButton) {
            setIsCollapsed(true);
        }
    };

    /**
     * useEffect hook for managing the click outside event listener.
     * If the `closeOnClickOutside` prop is true, the `handleClickOutside` event
     * handler will be added to the document as a "mousedown" event listener.
     * The event listener is removed when the component is unmounted or when
     * the `closeOnClickOutside` prop changes.
     */
    useEffect(() => {
        if(closeOnClickOutside){
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [closeOnClickOutside]);


    /**
     * A memoized list of SidebarItem components based on the provided sidebarItemsList prop.
     * The memoization ensures that the list is only recomputed when the `isCollapsed` state changes.
     *
     */
    const itemsList = useMemo(() => sidebarItemsList.map((item) => (
        <SidebarItem
            item={item}
            collapsed={isCollapsed}
            key={item.path}
        />
    )), [isCollapsed]);



    return (
        <>
            <div className={classNames(cls.button, buttonMods, [buttonClassName])} onClick={handleBurgerButtonClick}>{currentButton}</div>
        <div
            data-testid='sidebar'
            ref={sidebarRef}
            className={classNames(cls.Sidebar, mods, [])}
        >
            <div className={cls.items}>
            {itemsList}
            </div>
        </div>
        </>
    );
};
