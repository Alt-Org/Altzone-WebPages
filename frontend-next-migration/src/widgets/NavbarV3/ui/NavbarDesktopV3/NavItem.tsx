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
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type NavItemProps = {
    item: NavbarMenuItem;
    className?: string;
    currentPath?: string;
    mouseOver: boolean;
};

const NavItem = memo((props: NavItemProps) => {
    const { item, className = '', currentPath = '', mouseOver } = props;
    const { type: itemType } = item;
    const { t } = useClientTranslation('navbar');
    const { checkPermissionFor } = useUserPermissionsV2();

    if (itemType === 'navLink') {
        return (
            <li
                className={classNames('navItem', { active: currentPath === item.path }, [
                    className,
                ])}
            >
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={item.path}
                >
                    <span className={cls.col}>{t(`${item.name}`)}</span>
                </AppLink>
            </li>
        );
    }

    if (itemType === 'navDropDown') {
        const canUserSeeOwnClan = checkPermissionFor('clan:seeOwn').isGranted;
        const localizedElements = item.elements
            .map((element) => {
                if (!element || typeof element !== 'object' || !('elementText' in element))
                    return null;
                if (element.elementText === 'clanpage' && !canUserSeeOwnClan) return null;
                return {
                    ...element,
                    elementText: t(`${element.elementText}`),
                    active: currentPath === element?.link?.path,
                };
            })
            .filter(Boolean);

        const isDropdownActive = localizedElements.some((el) => el?.active);

        return (
            <li className={classNames('navItem', { active: isDropdownActive }, [className])}>
                <DropdownWrapper
                    elements={localizedElements}
                    contentAbsolute={true}
                    contentClassName="itemNavbarDropDownContent"
                    disableClickToggle={true}
                    isOpen={mouseOver}
                >
                    <div className={cls.col}>
                        {t(`${item.name}`)}
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={cls.chevron}
                        />
                    </div>
                </DropdownWrapper>
            </li>
        );
    }

    if (itemType === 'navLogo') {
        return (
            <AppLink
                theme={AppLinkTheme.PRIMARY}
                to={item.path}
            >
                <Image
                    priority
                    loading="eager"
                    alt={item.name || ''}
                    src={item.src || ''}
                    width={109}
                    height={92}
                    style={{ objectFit: 'contain' }}
                />
            </AppLink>
        );
    }

    return null;
});

NavItem.displayName = 'NavItemV3';

export default NavItem;
