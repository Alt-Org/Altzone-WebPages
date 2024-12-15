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
 * elements and click-outside-to-close functionality.
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
        [cls.left]: side === 'left',
        [cls.right]: side === 'right',
        [cls.opening]: isOpening,
    };

    const buttonMods = {
        [cls.collapsedButton]: isCollapsed,
        [cls.expandedButton]: !isCollapsed,
    };

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

    /**
     * useEffect hook for managing the click outside event listener.
     * If the `closeOnClickOutside` prop is true, the `handleClickOutside` event
     * handler will be added to the document as a "mousedown" event listener.
     * The event listener is removed when the component is unmounted or when
     * the `closeOnClickOutside` prop changes.
     */
    useEffect(() => {
        if (closeOnClickOutside) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [closeOnClickOutside]);

    /**
     * A memoized list of SidebarItem components based on the provided sidebarItemsList prop.
     * The memoization ensures that the list is only recomputed when the `isCollapsed` state changes.
     *
     */
    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    item={item}
                    collapsed={isCollapsed}
                    key={item.name}
                    active={item.active}
                />
            )),
        [isCollapsed, sidebarItemsList],
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
