'use client';
import { usePathname } from 'next/navigation';
import { CSSProperties, memo, useEffect, useState } from 'react';
import { LangSwitcher } from '@/features/LangSwitcher';
import { useLogoutMutation, useUserPermissionsV2 } from '@/entities/Auth';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useClientTranslation } from '@/shared/i18n';
import { NavbarBuild } from '../../model/types';
import { useDropdownManager } from '@/shared/lib/hooks/useDropdownManager';
import { LoginForm } from '@/features/AuthByUsername';
import cls from './NavbarDesktop.module.scss';
import NavItem from './NavItem';
import profileIcon from '@/shared/assets/icons/profileIcon.svg';
import searchIcon from '@/shared/assets/icons/search.png';
import Image from 'next/image';

export interface NavbarProps {
    marginTop?: number;
    className?: string;
    navbarBuild: NavbarBuild;
    isCollapsed?: boolean;
}

const NavbarDesktop = memo((props: NavbarProps) => {
    const { navbarBuild, marginTop, className = '', isCollapsed = false } = props;

    const { checkPermissionFor } = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor('login');
    const permissionToLogout = checkPermissionFor('logout');
    const [logout] = useLogoutMutation();
    const { t } = useClientTranslation('auth');

    const authDropdown = useDropdownManager();
    const langDropdown = useDropdownManager();

    const [isMouseOver, setIsMouseOver] = useState(false);
    const [realPath, setRealPath] = useState('/');
    const pathname = usePathname();

    const style = marginTop ? ({ marginTop: `${marginTop}px` } as CSSProperties) : {};

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

    const handleNavbarMouseEnter = () => {
        setIsMouseOver(true);
        if (authDropdown.state.isToggled) {
            authDropdown.actions.open();
        }
        if (langDropdown.state.isToggled) {
            langDropdown.actions.open();
        }
    };

    const handleNavbarMouseLeave = () => {
        setIsMouseOver(false);
        authDropdown.actions.close();
        langDropdown.actions.close();
    };

    useEffect(() => {
        const pathSegments = pathname.split('/').filter(Boolean);
        const newPath = pathSegments.length === 1 ? '/' : `/${pathSegments[1] || ''}`;
        setRealPath(newPath);
    }, [pathname]);

    return (
        <nav
            className={classNames(cls.navbar, { [cls.collapsed]: isCollapsed }, [className])}
            style={style}
            aria-label="Nav menu"
        >
            <div className={classNames(cls.inner, { [cls.collapsed]: isCollapsed })}>
                <div className={classNames(cls.logoSlot, { [cls.collapsed]: isCollapsed })}>
                    {navbarBuild.menu
                        .filter((item) => item.type === 'navLogo')
                        .map((item) => (
                            <NavItem
                                key={item.name}
                                item={item}
                                currentPath={realPath}
                                mouseOver={isMouseOver}
                                className=""
                            />
                        ))}
                </div>

                <ul
                    className={cls.navLinks}
                    onMouseEnter={handleNavbarMouseEnter}
                    onMouseLeave={handleNavbarMouseLeave}
                >
                    {navbarBuild.menu
                        .filter((item) => item.type !== 'navLogo')
                        .map((item) => (
                            <NavItem
                                key={item.name}
                                item={item}
                                currentPath={realPath}
                                mouseOver={isMouseOver}
                                className=""
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
                                    className={classNames(cls.dropdown, {
                                        [cls.dropdownOpen]: authDropdown.state.isOpen,
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
                                    className={classNames(cls.dropdown, {
                                        [cls.dropdownOpen]: authDropdown.state.isOpen,
                                    })}
                                >
                                    <div className={cls.authDropdownContent}>
                                        <div className={cls.profileLabel}>{t('ownProfile')}</div>
                                        <button
                                            className={cls.logoutButton}
                                            onClick={() => logout()}
                                        >
                                            {t('logout')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div
                        onClick={() => handleDropdownClick('lang')}
                        style={{ cursor: 'pointer' }}
                    >
                        <LangSwitcher
                            className={cls.langSwitcher}
                            isOpen={langDropdown.state.isOpen}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
});

NavbarDesktop.displayName = 'NavbarDesktopV3';

export default NavbarDesktop;
