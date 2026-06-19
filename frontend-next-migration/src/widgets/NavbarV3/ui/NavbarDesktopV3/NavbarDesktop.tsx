'use client';
import { CSSProperties, memo, useState } from 'react';
import Image from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useClientTranslation } from '@/shared/i18n';
import { useDropdownManager } from '@/shared/lib/hooks/useDropdownManager';
import { useLogoutMutation, useUserPermissionsV2 } from '@/entities/Auth';
import { LoginForm } from '@/features/AuthByUsername';
import { LangSwitcher } from '@/features/LangSwitcher';
import { NavbarBuild } from '../../model/types';
import cls from './NavbarDesktop.module.scss';
import NavItem from './NavItem';
import profileIcon from '@/shared/assets/icons/profileIcon.svg';
import searchIcon from '@/shared/assets/icons/search.png';

export interface NavbarProps {
    /** Pushes the bar down by this many pixels. */
    marginTop?: number;
    className?: string;
    /** The menu structure (links, dropdowns, logo). */
    navbarBuild: NavbarBuild;
    /** Collapse into a thin strip when true. */
    isCollapsed?: boolean;
}

/** Desktop navbar — hover dropdowns, auth/lang toggles, collapse support. */
const NavbarDesktop = memo((props: NavbarProps) => {
    const { navbarBuild, marginTop, className = '', isCollapsed = false } = props;

    const [isMouseOver, setIsMouseOver] = useState(false);
    const { checkPermissionFor } = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor('login');
    const permissionToLogout = checkPermissionFor('logout');
    const [logout] = useLogoutMutation();
    const { t } = useClientTranslation('auth');

    const authDropdown = useDropdownManager();
    const langDropdown = useDropdownManager();

    const style = marginTop ? ({ marginTop: `${marginTop}px` } as CSSProperties) : {};

    const nonLogoItems = navbarBuild.menu.filter((item) => item.type !== 'navLogo');
    let dropIdx = 0;
    const dropdownIndices = new Map<string, number>();
    nonLogoItems.forEach((item) => {
        if (item.type === 'navDropDown') {
            dropdownIndices.set(item.name, dropIdx++);
        }
    });
    const totalDropdowns = dropIdx;

    const handleDropdownClick = (dropdown: 'auth' | 'lang') => {
        if (dropdown === 'auth') {
            authDropdown.actions.toggle();
            if (!authDropdown.state.isToggled) {
                langDropdown.actions.reset();
            }
        } else {
            langDropdown.actions.toggle();
            if (!langDropdown.state.isToggled) {
                authDropdown.actions.reset();
            }
        }
    };

    return (
        <nav
            className={classNames(cls.navbar, { [cls.collapsed]: isCollapsed }, [className])}
            style={style}
            aria-label="Nav menu"
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
        >
            <div
                className={classNames(cls.inner, {
                    [cls.collapsed]: isCollapsed,
                })}
            >
                <div className={classNames(cls.logoSlot, { [cls.collapsed]: isCollapsed })}>
                    {navbarBuild.menu
                        .filter((item) => item.type === 'navLogo')
                        .map((item) => (
                            <NavItem
                                key={item.name}
                                item={item}
                            />
                        ))}
                </div>

                <ul className={cls.navLinks}>
                    {nonLogoItems.map((item) => (
                        <NavItem
                            key={item.name}
                            item={item}
                            mouseOver={isMouseOver}
                            dropdownIndex={dropdownIndices.get(item.name) ?? -1}
                            totalDropdowns={totalDropdowns}
                        />
                    ))}
                </ul>

                <div className={classNames(cls.actions, { [cls.collapsed]: isCollapsed })}>
                    <button
                        className={cls.iconBtn}
                        aria-label="Search"
                    >
                        <Image
                            src={searchIcon}
                            alt="Search"
                            width={30}
                            height={30}
                        />
                    </button>

                    <div className={cls.authWrapper}>
                        {permissionToLogin.isGranted ? (
                            <div className={cls.authContainer}>
                                <div
                                    className={cls.authTrigger}
                                    onClick={() => handleDropdownClick('auth')}
                                >
                                    <Image
                                        src={profileIcon}
                                        alt="Login Icon"
                                        width={28}
                                        height={28}
                                    />
                                </div>
                                <div
                                    className={classNames(cls.authDropdown, {
                                        [cls.authDropdownVisible]:
                                            authDropdown.state.isOpen && !isCollapsed,
                                    })}
                                >
                                    <LoginForm />
                                </div>
                            </div>
                        ) : permissionToLogout.isGranted ? (
                            <div className={cls.authContainer}>
                                <div
                                    className={cls.authTrigger}
                                    onClick={() => handleDropdownClick('auth')}
                                >
                                    <Image
                                        src={profileIcon}
                                        alt="Profile Icon"
                                        width={28}
                                        height={28}
                                    />
                                </div>
                                <div
                                    className={classNames(cls.authDropdown, {
                                        [cls.authDropdownVisible]:
                                            authDropdown.state.isOpen && !isCollapsed,
                                    })}
                                >
                                    <div className={cls.authDropdownContent}>
                                        <div className={cls.profileLabel}>{t('ownProfile')}</div>
                                        <button
                                            className={cls.logoutButton}
                                            onClick={() => {
                                                logout();
                                            }}
                                        >
                                            {t('logout')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div
                        className={cls.langSwitcher}
                        onClick={() => handleDropdownClick('lang')}
                    >
                        <LangSwitcher isOpen={langDropdown.state.isOpen && !isCollapsed} />
                    </div>
                </div>
            </div>
        </nav>
    );
});

NavbarDesktop.displayName = 'NavbarDesktopV3';

export default NavbarDesktop;
