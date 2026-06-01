// src/widgets/Navbar/ui/NavbarDesktopV2/NavbarDesktop.tsx
import { usePathname } from 'next/navigation';
import { CSSProperties, memo, useEffect, useState } from 'react';
import { LangSwitcher } from '@/features/LangSwitcher';
import { useLogoutMutation, useUserPermissionsV2 } from '@/entities/Auth';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useClientTranslation } from '@/shared/i18n';
import { Container } from '@/shared/ui/Container';
import useIsPageScrollbar from '@/shared/lib/hooks/useIsPageScrollbar';
import { useDropdownManager } from '@/shared/lib/hooks/useDropdownManager';
import { NavbarBuild } from '../../model/types';
import { ToggleCollapseButton } from '../ToggleCollapseButton/ToggleCollapseButton';
import { ToggleFixButton } from '../ToggleFixButton/ToggleFixButton';
import { LoginForm } from '@/features/AuthByUsername';
import cls from './NavbarDesktop.module.scss';
import NavItem from './NavItem';
import profileIcon from '@/shared/assets/icons/profileIcon.svg';
import searchIcon from '@/shared/assets/icons/search.png';
import Image from 'next/image';

/**
 * Properties for NavnarDesctop component
 *
 * @property {number} marginTop Margin at the top
 * @property {string} className Additional CSS classes
 * @property {NavbarBuild} navbarBuild Navigation bar components according to usage type and view size
 * @property {boolean} isFixed This is deprecated. Fixed type is get from context
 */

export interface NavbarProps {
    marginTop?: number;
    className?: string;
    navbarBuild: NavbarBuild;
    isFixed: boolean;
    isCollapsed: boolean;
    toggleCollapsed: () => void;
    toggleFixed: () => void;
}

const NavbarDesktop = memo((props: NavbarProps) => {
    const {
        navbarBuild,
        marginTop,
        className = '',
        toggleCollapsed,
        toggleFixed,
        isCollapsed,
        isFixed,
    } = props;

    const hasScrollbar = useIsPageScrollbar();
    const { checkPermissionFor } = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor('login');
    const permissionToLogout = checkPermissionFor('logout');
    const [logout] = useLogoutMutation();
    const { t } = useClientTranslation('auth');

    // Optimized dropdown management
    const authDropdown = useDropdownManager();
    const langDropdown = useDropdownManager();

    const [isAnimating, setIsAnimating] = useState(false);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [realPath, setRealPath] = useState('/');
    const pathname = usePathname();

    const style = marginTop ? ({ marginTop: `${marginTop}px` } as CSSProperties) : {};

    const mods: Record<string, boolean> = {
        [cls.fixed]: isFixed,
        [cls.collapsed]: isCollapsed,
        [cls.collapsing]: isAnimating,
    };

    const collapsedMod = { [cls.collapsed]: isCollapsed };

    const ModsUlAndLi: Record<string, boolean> = {
        [cls.collapsed]: isCollapsed,
    };

    // Shared dropdown handler
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

    const handleCollapseClick = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            toggleCollapsed?.();
        }
    };

    const handleTransitionEnd = () => {
        setIsAnimating(false);
    };

    const handleNavbarMouseEnter = () => {
        setIsMouseOver(true);
        // Show dropdowns if they were toggled
        if (authDropdown.state.isToggled) {
            authDropdown.actions.open();
        }
        if (langDropdown.state.isToggled) {
            langDropdown.actions.open();
        }
    };

    const handleNavbarMouseLeave = () => {
        setIsMouseOver(false);
        // Hide dropdowns but keep toggled states
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
            className={classNames(cls.navbar, mods, [className])}
            style={style}
            aria-label="Nav menu"
        >
            <div className={classNames(cls.inner, collapsedMod)}>
                <div className={classNames(cls.logoSlot, collapsedMod)}>
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

                <div className={classNames(cls.actions, collapsedMod)}>
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
                                        [cls.dropdownOpen]:
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
                                        width={30}
                                        height={30}
                                        className={cls.profileIcon}
                                    />
                                </div>
                                <div
                                    className={classNames(cls.dropdown, {
                                        [cls.dropdownOpen]:
                                            authDropdown.state.isOpen && !isCollapsed,
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
                            isOpen={langDropdown.state.isOpen && !isCollapsed}
                        />
                    </div>
                    {isFixed && (
                        <li
                            data-testid="collapseExpandWrapper"
                            className={classNames(cls.collapseButtonWrapper, {
                                [cls.collapsing]: isAnimating,
                            })}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <ToggleCollapseButton
                                onClick={handleCollapseClick}
                                isCollapsed={isCollapsed}
                                className={cls.collapseButton}
                                disabled={isAnimating}
                            />
                        </li>
                    )}
                </div>
            </div>
        </nav>
    );
});

export default NavbarDesktop;
NavbarDesktop.displayName = 'NavbarDesktop';
