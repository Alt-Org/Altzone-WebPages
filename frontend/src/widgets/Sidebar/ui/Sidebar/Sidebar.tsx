import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./Sidebar.module.scss";
import {SidebarItemType} from "@/widgets/Sidebar/model/items";
import {useMemo, useState} from "react";
import {SidebarItem} from "@/widgets/Sidebar/ui/SidebarItem/SidebarItem";


interface SidebarProps {
    className?: string;
    sidebarItemsList: SidebarItemType[];
}

export const Sidebar = ({ className = '',  sidebarItemsList}: SidebarProps) => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleBurgerButtonClick = () => {
        setIsCollapsed((prevState) => !prevState);
    };

    const currentButton = isCollapsed ? '☰' : 'Х'

    const mods = {
        [cls.collapsed]: isCollapsed,
        [cls.expanded]: !isCollapsed
    }

    const buttonMods = {
        [cls.collapsedButton]: isCollapsed,
        [cls.expandedButton]: !isCollapsed
    }


    const itemsList = useMemo(() => sidebarItemsList.map((item) => (
        <SidebarItem
            item={item}
            collapsed={isCollapsed}
            key={item.path}
        />
    )), [isCollapsed]);


    return (
        <>
            <div className={classNames(cls.button,buttonMods, [className])} onClick={handleBurgerButtonClick}>{currentButton}</div>
        <div
            data-testid='sidebar'
            className={classNames(cls.Sidebar, mods, [
            ])}
        >
            <div className={cls.items}>
            {itemsList}
            </div>
        </div>
        </>
    );
};
