import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./Sidebar.module.scss";
import {SidebarItemType} from "@/widgets/Sidebar/model/items";
import {useMemo, useState} from "react";
import {SidebarItem} from "@/widgets/Sidebar/ui/SidebarItem/SidebarItem";


interface SidebarProps {
    className?: string;
    SidebarItemsList: SidebarItemType[];
}

export const Sidebar = ({ className = '',  SidebarItemsList}: SidebarProps) => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleBurgerButtonClick = () => {
        setIsCollapsed((prevState) => !prevState);
    };

    const currentButton = isCollapsed ? '☰' : 'Х'


    const itemsList = useMemo(() => SidebarItemsList.map((item) => (
        <SidebarItem
            item={item}
            collapsed={isCollapsed}
            key={item.path}
        />
    )), [isCollapsed]);


    return (
        <>
            <div className={className} onClick={handleBurgerButtonClick}>{currentButton}</div>
        <div
            data-testid='sidebar'
            className={classNames(cls.Sidebar, { [cls.collapsed]: isCollapsed }, [
            ])}
        >
            <div className={cls.items}>
            {itemsList}
            </div>
        </div>
        </>
    );
};
