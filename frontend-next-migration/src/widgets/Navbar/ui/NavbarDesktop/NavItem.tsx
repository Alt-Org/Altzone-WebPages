// src/widgets/Navbar/ui/NavbarDesktop/NavItem.tsx
'use client';
import Image from 'next/image';
import { memo } from 'react';
import { useUserPermissionsV2 } from '@/entities/Auth';
import { useClientTranslation } from '@/shared/i18n';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { DropdownWrapper } from '@/shared/ui/DropdownWrapper';
import { NavbarMenuItem } from '../../model/types';
import cls from './NavbarDesktop.module.scss';

type NavItemProps = {
    item: NavbarMenuItem;
    className?: string;
    currentPath?: string;
};

const NavItem = memo((props: NavItemProps) => {
    const { item, className = '', currentPath = '' } = props;
    const { type: itemType } = item;
    const { t } = useClientTranslation('navbar');
    const { checkPermissionFor } = useUserPermissionsV2();

    if (itemType === 'navLink') {
        return (
            <li
                key={item.path}
                className={classNames(cls.navItem, { [cls.active]: currentPath === item.path }, [
                    className,
                ])}
            >
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={item.path}
                    key={item.path}
                >
                    <span>{t(`${item.name}`)}</span>
                </AppLink>
            </li>
        );
    }

    if (itemType === 'navDropDown') {
        const canUserSeeOwnClan = checkPermissionFor('clan:seeOwn').isGranted;
        const localizedElements = item.elements
            .map((element) => {
                // @ts-ignore - element is a union from Dropdown wrapper; not all variants declare elementText
                if (element.elementText === 'clanpage' && !canUserSeeOwnClan) {
                    return null;
                }
                // @ts-ignore - spread element although TS union lacks common shape for all properties
                const transformedElement = {
                    // @ts-ignore - preserve original element fields coming from runtime config
                    ...element,
                    // @ts-ignore - localize elementText even though not in every union member
                    elementText: t(`${element.elementText}`),
                    // @ts-ignore - add computed 'active' flag used only by rendering logic
                    active: currentPath === element?.link?.path,
                };

                return transformedElement;
            })
            .filter((element) => element !== null);

        const isDropdownActive = localizedElements.some((element) => element.active);

        return (
            <li
                key={item.name}
                className={classNames(cls.navItem, { [cls.active]: isDropdownActive }, [className])}
            >
                <DropdownWrapper
                    isOpen={false}
                    elements={localizedElements}
                    contentAbsolute={true}
                    mouseOverLeaveMode={true}
                    contentClassName={cls.itemNavbarDropDownContent}
                >
                    <div>{t(`${item.name}`)}</div>
                </DropdownWrapper>
            </li>
        );
    }

    if (itemType === 'navLogo') {
        return (
            <li
                key={item.src}
                className={classNames(cls.navItem, {}, [className])}
            >
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={item.path}
                    className={classNames(cls.appLink, {}, [cls.appLinkLogo])}
                >
                    <Image
                        priority={true}
                        loading={'eager'}
                        alt={item.name || ''}
                        src={item.src || ''}
                        width={120}
                        height={0}
                        className={cls.itemLogoImg}
                    />
                </AppLink>
            </li>
        );
    }

    return null;
});

NavItem.displayName = 'NavItem';

export default NavItem;
