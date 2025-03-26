import {
    DropDownElement,
    DropdownWrapper,
    DropDownElementASTextOrLink,
} from '@/shared/ui/DropdownWrapper';
import { ReactNode, useEffect, useState } from 'react';
import cls from './NavMenu.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { usePathname } from 'next/navigation';
import { INavMenuItem, NavMenuItemType } from '../model/types/';

export interface NavMenuProps {
    dropdownItems: INavMenuItem[];
    className?: string;
}

/**
 * NavMenu component for creating a navigation menu with dropdowns. This like an open NavMenuWithDropdownsV2 but without the dropdown mechanic
 *
 * @param {NavMenuProps} props - The properties for the NavMenu component.
 * @param {INavMenuItem[]} props.dropdownItems - An array of dropdown items, which can include nested dropdown elements or plain React nodes.
 * @param {string} [props.className=''] - Additional CSS classes for styling the root container.
 * @returns {JSX.Element} - The rendered `NavMenu` component.
 *
 * @example
 * const navMenuProps: NavMenuProps = {
 *   dropdownItems: [
 *     { elementText: 'Item 1', link: { path: '/item1', isExternal: false } },
 *     {
 *       name: 'Category 1',
 *       elements: [
 *         { id: '1', elementText: 'Item 2', link: { path: '/item2', isExternal: false } },
 *         { id: '2', elementText: 'Item 3', link: { path: '/item3', isExternal: false } },
 *       ],
 *     },
 *     {
 *       name: 'Category 2',
 *       elements: [
 *         { id: '3', elementText: 'Item 4', link: { path: '/item4', isExternal: false } },
 *         { id: '4', elementText: 'Item 5', link: { path: '/item5', isExternal: false } },
 *       ],
 *     },
 *   ],
 * };
 */

function NavMenu(props: NavMenuProps): JSX.Element {
    const { dropdownItems, className = '' } = props;

    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    return (
        <div className={classNames(cls.NavMenu, {}, [className])}>
            {dropdownItems.map((item, index) => (
                <div key={index}>
                    {item.type === NavMenuItemType.Dropdown && (
                        <DropdownWrapper
                            childrenWrapperClassName={classNames(cls.ChildrenWrapper, {
                                [cls.activeDropdown]: index === openDropdown,
                                [cls.active]: item.active,
                            })}
                            isOpen={index === openDropdown}
                            onOpen={() => {
                                setOpenDropdown(index);
                            }}
                            onClose={() => {
                                if (openDropdown === index) setOpenDropdown(null);
                            }}
                            elements={item.elements}
                            dataTestId={item.name}
                            contentClassName={cls.DropDownElementChildren}
                        >
                            {item.name}
                        </DropdownWrapper>
                    )}
                    {item.type === NavMenuItemType.Link && (
                        <AppLink
                            to={item.path}
                            className={classNames(cls.link, { [cls.active]: item.active })}
                        >
                            {item.name}
                        </AppLink>
                    )}
                    {item.type === NavMenuItemType.Element && item.element}
                </div>
            ))}
        </div>
    );
}

export default NavMenu;
