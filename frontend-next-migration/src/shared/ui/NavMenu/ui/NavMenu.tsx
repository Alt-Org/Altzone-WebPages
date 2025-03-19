import {
    DropDownElement,
    DropdownWrapper,
    DropDownElementASTextOrLink,
} from '@/shared/ui/DropdownWrapperV2';
import { ReactNode, useEffect, useState } from 'react';
import cls from './NavMenuWithDropdowns.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { usePathname } from 'next/navigation';

export interface DropdownItem {
    title: string;
    elements: DropDownElement[];
    openByDefault?: boolean;
}

export interface NavMenuProps {
    dropdownItems: (DropdownItem | ReactNode | DropDownElementASTextOrLink)[];
    openByDefault?: boolean;
    titleAsActive?: boolean;
    staticDropdown?: boolean;
    title: string;
    className?: string;
}

function isDropdownItem(
    item: DropdownItem | ReactNode | DropDownElementASTextOrLink,
): item is DropdownItem {
    return typeof item === 'object' && item !== null && 'title' in item && 'elements' in item;
}

function isDropDownElementASTextOrLink(item: any): item is DropDownElementASTextOrLink {
    return typeof item === 'object' && item !== null && 'elementText' in item;
}

/**
 * NavMenu component for creating a navigation menu with dropdowns. This like an open NavMenuWithDropdownsV2 but without the dropdown mechanic
 *
 * @param {NavMenuProps} props - The properties for the NavMenu component.
 * @param {string} props.title - The title displayed for the dropdown menu.
 * @param {(DropdownItem | ReactNode | DropDownElementASTextOrLink)[]} props.dropdownItems - An array of dropdown items, which can include nested dropdown elements or plain React nodes.
 * @param {boolean} [props.openByDefault=false] - Specifies if the dropdown should be open by default.
 * @param {boolean} [props.staticDropdown=false] - Determines if the first dropdown element remains static and always open.
 * @param {boolean} [props.titleAsActive=false] - Uses the active dropdown item title as the main dropdown title if the item's link path matches the current router path.
 * @param {string} [props.className=''] - Additional CSS classes for styling the root container.
 * @returns {JSX.Element} - The rendered `NavMenu` component.
 *
 * @example
 * const navMenuProps: NavMenuProps = {
 *   title: 'Menu',
 *   openByDefault: false,
 *   staticDropdown: false,
 *   titleAsActive: false,
 *   dropdownItems: [
 *     { elementText: 'Item 1', link: { path: '/item1', isExternal: false } },
 *     {
 *       title: 'Category 1',
 *       openByDefault: false,
 *       elements: [
 *         { id: '1', elementText: 'Item 2', link: { path: '/item2', isExternal: false } },
 *         { id: '2', elementText: 'Item 3', link: { path: '/item3', isExternal: false } },
 *       ],
 *     },
 *     {
 *       title: 'Category 2',
 *       openByDefault: false,
 *       elements: [
 *         { id: '3', elementText: 'Item 4', link: { path: '/item4', isExternal: false } },
 *         { id: '4', elementText: 'Item 5', link: { path: '/item5', isExternal: false } },
 *       ],
 *     },
 *   ],
 * };
 */

function NavMenu(props: NavMenuProps): JSX.Element {
    const {
        dropdownItems,
        className = '',
        title,
        openByDefault = false,
        staticDropdown = false,
        titleAsActive = false,
    } = props;

    const [realPath, setRealPath] = useState('/');
    const pathname = usePathname();

    useEffect(() => {
        const pathSegments = pathname.split('/').filter(Boolean);
        const newPath = `/${pathSegments.slice(1, 4).join('/')}`;
        // console.log(newPath);
        // console.log(pathSegments);
        setRealPath(newPath);
    }, [pathname]);

    // Function to set title to active paths title, experimental
    const getActiveTitle = (): string => {
        for (const item of dropdownItems) {
            if (isDropDownElementASTextOrLink(item) && item.link?.path === realPath) {
                return item.elementText || '';
            }
        }
        return title; // Default title if no active found
    };

    const dynamicTitle = titleAsActive ? getActiveTitle() : title;

    return (
        <div className={classNames(cls.NavMenu, {}, [className])}>
            {/* <DropdownWrapper
                openByDefault={openByDefault}
                staticDropdown={staticDropdown}
                dynamicTitle={dynamicTitle}
                staticTitle={title}
                dataTestId={title}
                elements={}
                className={cls.topDropDown}
                childrenWrapperClassName={cls.topDropDownChildren}
                contentClassName={cls.topDropDownContent}
                showArrow={true}
            /> */}
            {dropdownItems.map((item, index) =>
                isDropdownItem(item) ? (
                    <DropdownWrapper
                        key={item.title}
                        openByDefault={item.openByDefault}
                        elements={item.elements}
                        dataTestId={item.title}
                        contentClassName={cls.DropDownElementChildren}
                    >
                        {item.title}
                    </DropdownWrapper>
                ) : isDropDownElementASTextOrLink(item) ? (
                    item?.link ? (
                        <AppLink
                            isExternal={item.link.isExternal}
                            to={item.link.path}
                            className={classNames(cls.link, { [cls.active]: item.active })}
                        >
                            {item.elementText}
                        </AppLink>
                    ) : (
                        <div className={classNames(cls.text, { [cls.active]: item.active })}>
                            {item.elementText}
                        </div>
                    )
                ) : (
                    <div key={index}>{item}</div>
                ),
            )}
        </div>
    );
}

export default NavMenu;
