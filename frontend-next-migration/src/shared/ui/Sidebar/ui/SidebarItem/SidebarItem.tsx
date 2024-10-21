import { memo } from 'react';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownWrapper } from '@/shared/ui/DropdownWrapper';
import { ISidebarItem, sidebarItemType } from '../../model/items';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: ISidebarItem;
    collapsed: boolean;
}

/**
 * Renders a sidebar item, which can either be a basic item or a dropdown.
 *
 * @param {SidebarItemProps} props - The props for the component.
 * @param {ISidebarItem} props.item - The item to display in the sidebar.
 * @param {boolean} props.collapsed - Whether the sidebar is collapsed or not.
 *
 * @example
 * // Rendering a basic sidebar item:
 * <SidebarItem
 *    item={{ type: sidebarItemType.ISidebarItemBasic, path: '/home', name: 'Home' }}
 *    collapsed={false}
 * />
 *
 * @example
 * // Rendering a dropdown sidebar item:
 * <SidebarItem
 *    item={{
 *        type: sidebarItemType.ISidebarItemDropDown,
 *        name: 'Settings',
 *        elements: [{ elementText: 'Profile', link: {path: '/profile'} }, { elementText: 'Logout', onClickCallback: handleLogout }]
 *    }}
 *    collapsed={true}
 * />
 */
export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    if (item.type === sidebarItemType.ISidebarItemBasic) {
        return (
            <AppLink
                theme={AppLinkTheme.PRIMARY}
                to={item.path}
                className={classNames(cls.item, { [cls.collapsed]: collapsed }, [cls.itemBasic])}
            >
                <span className={cls.link}>{item.name}</span>
            </AppLink>
        );
    }

    if (item.type === sidebarItemType.ISidebarItemDropDown) {
        return (
            <DropdownWrapper
                className={cls.itemDropDown}
                contentItemClassName={cls.item}
                contentClassName={classNames(cls.link, { [cls.collapsed]: collapsed })}
                elements={item.elements}
            >
                {item.name}
            </DropdownWrapper>
        );
    }
    return null;
});

SidebarItem.displayName = 'SidebarItem';
