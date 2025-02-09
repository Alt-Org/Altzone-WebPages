import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ISidebarItem } from '@/shared/ui/Sidebar/model/items';
import { SidebarItem } from '@/shared/ui/Sidebar/ui/SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    buttonClassName?: string;
    sidebarClassName?: string;
    sidebarItemsList: ISidebarItem[];
    side?: 'left' | 'right';
    closeOnClickOutside?: boolean;
    bottomItems?: ReactNode;
    onClose?: () => void;
    sidebarItemsListResetKey?: number;
}

/**
 * @fileoverview A customizable sidebar component that can be expanded or collapsed.
 *
 * This Sidebar component allows for an expandable and collapsible navigation panel.
 * It includes a toggle button for expansion and collapse, and supports the addition of external
 * elements and click-outside-to-close functionality. Additionally, it manages the state of dropdown
 * items to ensure only one dropdown is open at a time.
 *
 * Example usage:
 *
 * ```tsx
 * import { Sidebar } from './Sidebar';
 * import React from 'react';
 * import { sampleItems } from './sampleItems';  // Assume this imports an array of ISidebarItem
 *
 * const MyComponent: React.FC = () => {
 *   return (
 *     <Sidebar
 *       buttonClassName="my-custom-button"
 *       sidebarClassName="my-custom-sidebar"
 *       sidebarItemsList={sampleItems}
 *       side="left"
 *       closeOnClickOutside={true}
 *       bottomItems={<div>Custom Bottom Content</div>}
 *     />
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
export const Sidebar = ({
    buttonClassName = '',
    sidebarClassName = '',
    sidebarItemsList,
    side = 'left',
    closeOnClickOutside = false,
    bottomItems = 'Login',
    onClose,
    sidebarItemsListResetKey,
}: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isOpening, setIsOpening] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleBurgerButtonClick = () => {
        setIsOpening(true);
        setTimeout(() => setIsOpening(false), 500);
        setIsCollapsed((prevState) => {
            if (prevState) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
                onClose?.();
            }
            return !prevState;
        });
    };

    const mods = {
        [cls.collapsed]: isCollapsed,
        [cls.expanded]: !isCollapsed,
        [cls.left]: side === 'left',
        [cls.right]: side === 'right',
        [cls.opening]: isOpening,
    };

    const buttonMods = {
        [cls.collapsedButton]: isCollapsed,
        [cls.expandedButton]: !isCollapsed,
    };

    const sidebarRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        const clickedButton = (event.target as HTMLElement).closest(`.${cls.button}`);

        if (
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target as Node) &&
            !clickedButton
        ) {
            setIsCollapsed(true);
            document.body.classList.remove('no-scroll');
        }
    };

    useEffect(() => {
        if (closeOnClickOutside) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [closeOnClickOutside]);

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    key={item.name}
                    item={item}
                    collapsed={isCollapsed}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                />
            )),
        [isCollapsed, sidebarItemsList, openDropdown],
    );

    return (
        <>
            <div
                className={classNames(cls.button, buttonMods, [buttonClassName])}
                onClick={handleBurgerButtonClick}
            >
                <FontAwesomeIcon
                    className={`${cls.faBars}`}
                    icon={faBars}
                />
                <FontAwesomeIcon
                    className={`${cls.faTimes}`}
                    icon={faTimes}
                />
            </div>

            <div
                data-testid="sidebar"
                ref={sidebarRef}
                className={classNames(cls.Sidebar, mods, [sidebarClassName])}
            >
                <div
                    className={cls.items}
                    key={sidebarItemsListResetKey}
                >
                    {itemsList}
                </div>
                <div className={cls.bottomItems}>{bottomItems}</div>
            </div>
        </>
    );
};
