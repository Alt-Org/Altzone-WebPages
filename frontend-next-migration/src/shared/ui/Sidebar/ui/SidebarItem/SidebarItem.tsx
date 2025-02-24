import { memo } from 'react';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownWrapper } from '@/shared/ui/DropdownWrapperV2';
import { ISidebarItem, sidebarItemType } from '../../model/items';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: ISidebarItem;
    collapsed: boolean;
    active?: boolean;
    openDropdown: string | null;
    setOpenDropdown: (name: string | null) => void;
}
/**
 * Renders a sidebar item, which can either be a basic item or a dropdown.
 * @param {SidebarItemProps} props - The props for the component.
 * @param {ISidebarItem} props.item - The item to display in the sidebar.
 * @param {boolean} props.collapsed - Whether the sidebar is collapsed or not.
 * @param {boolean} [props.active=false] - Whether the item is active or not.
 * @param {string | null} props.openDropdown - The name of the currently open dropdown.
 * @param {function} props.setOpenDropdown - Function to set the currently open dropdown.
 *
 * @example
 * Rendering a basic sidebar item:
 * <SidebarItem
 *    item={{ type: sidebarItemType.ISidebarItemBasic, path: '/home', name: 'Home' }}
 *    collapsed={false}
 * />
 *
 * @example
 * Rendering a dropdown sidebar item:
 * <SidebarItem
 *    item={{
 *        type: sidebarItemType.ISidebarItemDropDown,
 *        name: 'Settings',
 *        elements: [
 *            { elementText: 'Profile', link: { path: '/profile' } },
 *            { elementText: 'Logout', onClickCallback: handleLogout }
 *        ]
 *    }}
 *    collapsed={true}
 *    openDropdown={openDropdown}
 *    setOpenDropdown={setOpenDropdown}
 * />
 */

export const SidebarItem = memo(
    ({ item, collapsed, active = false, openDropdown, setOpenDropdown }: SidebarItemProps) => {
        if (item.type === sidebarItemType.ISidebarItemBasic) {
            return (
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={item.path}
                    className={classNames(
                        cls.item,
                        { [cls.collapsed]: collapsed, [cls.active]: active },
                        [cls.itemBasic],
                    )}
                >
                    <span className={cls.link}>{item.name}</span>
                </AppLink>
            );
        }

        if (item.type === sidebarItemType.ISidebarItemDropDown) {
            return (
                <DropdownWrapper
                    className={classNames(cls.itemDropDown, { [cls.active]: active })}
                    contentItemClassName={cls.item}
                    contentClassName={classNames(cls.link, { [cls.collapsed]: collapsed })}
                    elements={item.elements}
                    isOpen={openDropdown === item.name}
                    onOpen={() => setOpenDropdown(item.name)}
                >
                    <div className={cls.item}> {item.name} </div>
                </DropdownWrapper>
            );
        }
        return null;
    },
);

SidebarItem.displayName = 'SidebarItem';
