import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./Sidebar.module.scss";
import {SidebarItemType} from "@/shared/ui/Sidebar/model/items";
import {useEffect, useMemo, useRef, useState} from "react";
import {SidebarItem} from "@/shared/ui/Sidebar/ui/SidebarItem/SidebarItem";


interface SidebarProps {
    buttonClassName?: string;
    sidebarItemsList: SidebarItemType[];
    side? : 'left'| 'right'
}

export const Sidebar = ({ buttonClassName = '',  sidebarItemsList , side = 'left'}: SidebarProps) => {

    const [isCollapsed, setIsCollapsed] = useState(true);

        const handleBurgerButtonClick = () => {
        setIsCollapsed((prevState) => !prevState);
    };

    const currentButton = isCollapsed ? '☰' : 'Х'

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

    const sidebarRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        const clickedButton = (event.target as HTMLElement).classList.contains(cls.button);
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)  && !clickedButton) {
            setIsCollapsed(true);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


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
