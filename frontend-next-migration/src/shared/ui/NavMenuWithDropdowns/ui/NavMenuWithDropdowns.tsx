import { DropDownElement, DropdownWrapper } from '@/shared/ui/DropdownWrapper';
import { ReactNode } from 'react';
import cls from './NavMenuWithDropdowns.module.scss';

interface DropdownItem {
    title: string;
    elements: DropDownElement[];
    openByDefault?: boolean;
}

export interface NavMenuWithDropdownsProps {
    dropdownItems: (DropdownItem | ReactNode)[];
    openByDefault?: boolean;
    title: string;
    className?: string;
}

function isDropdownItem(item: DropdownItem | ReactNode): item is DropdownItem {
    return typeof item === 'object' && item !== null && 'title' in item && 'elements' in item;
}

function NavMenuWithDropdowns(props: NavMenuWithDropdownsProps): JSX.Element {
    const { dropdownItems, className, title, openByDefault = false } = props;

    return (
        <div className={className}>
            <DropdownWrapper
                openByDefault={openByDefault}
                elements={dropdownItems.map((item, index) =>
                    isDropdownItem(item) ? (
                        <NestedDropDown
                            key={item.title}
                            openByDefault={item.openByDefault}
                            elements={item.elements}
                        >
                            {item.title}
                        </NestedDropDown>
                    ) : (
                        <div key={index}>{item}</div>
                    ),
                )}
                className={cls.topDropDown}
                childrenWrapperClassName={cls.topDropDownChildren}
                contentClassName={cls.topDropDownContent}
            >
                {title}
            </DropdownWrapper>
        </div>
    );
}

interface NestedDropDownProps {
    openByDefault?: boolean;
    elements: DropDownElement[];
    children: ReactNode;
}

function NestedDropDown(props: NestedDropDownProps) {
    const { openByDefault, elements, children } = props;

    return (
        <DropdownWrapper
            openByDefault={openByDefault}
            className={cls.subDropDown}
            contentClassName={cls.subDropDownContent}
            childrenWrapperClassName={cls.subDropDownChildren}
            elements={elements}
        >
            {children}
        </DropdownWrapper>
    );
}

/**
 * Navigation menu component with nested dropdowns.
 *
 * @param {NavMenuWithDropdownsProps} props - Props for the component.
 * @returns {JSX.Element} The rendered navigation menu with dropdowns.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { NavMenuWithDropdowns, NavMenuWithDropdownsProps } from './NavMenuWithDropdowns';
 *
 * const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
 *     title: 'Forum',
 *     openByDefault: true,
 *     dropdownItems: [
 *         {
 *             title: 'Heroes',
 *             openByDefault: false,
 *             elements: [
 *                 { elementText: 'Hero 1', id: 'hero1', link: { path:"hero/1", isExternal: false}},
 *                 { elementText: 'Hero 2', id: 'hero2', link: { path:"hero/2", isExternal: false}},
 *             ],
 *         },
 *         {
 *             title: 'News',
 *             openByDefault: false,
 *             elements: [
 *                 { elementText: 'Piece of news 1', id: 'news1', link: { path:"news/1", isExternal: true}},
 *                 { elementText: 'Piece of news 2', id: 'news2',  link: { path:"news/2", isExternal: true}},
 *                 { elementText: 'Piece of news 3', id: 'news3',  link: { path:"news/3", isExternal: true}},
 *             ],
 *         },
 *     ],
 * };
 *
 * function App() {
 *     return (
 *         <NavMenuWithDropdowns
 *             {...navMenuWithDropdownsProps}
 *             className="custom-nav-menu"
 *         />
 *     );
 * }
 *
 * export default App;
 * ```
 */

export default NavMenuWithDropdowns;
