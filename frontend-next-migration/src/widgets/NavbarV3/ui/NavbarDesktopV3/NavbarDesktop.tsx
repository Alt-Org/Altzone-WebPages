'use client';
import { CSSProperties, memo, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useClientTranslation } from '@/shared/i18n';
import { useDropdownManager } from '@/shared/lib/hooks/useDropdownManager';
import { useLogoutMutation, useUserPermissionsV2 } from '@/entities/Auth';
import { LoginForm } from '@/features/AuthByUsername';
import { LangSwitcher } from '@/features/LangSwitcher';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { NavbarBuild } from '../../model/types';
import cls from './NavbarDesktop.module.scss';
import profileIcon from '@/shared/assets/icons/profileIcon.svg';
import searchIcon from '@/shared/assets/icons/search.png';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CHEVRON_ITEMS = new Set(['game', 'gallery', 'gameart', 'community']);

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

    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearCloseTimer = useCallback(() => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
    }, []);

    const handleItemEnter = useCallback(
        (name: string) => {
            clearCloseTimer();
            setHoveredItem(name);
        },
        [clearCloseTimer],
    );

    const handleItemLeave = useCallback(() => {
        closeTimerRef.current = setTimeout(() => {
            setHoveredItem(null);
        }, 200);
    }, []);

    const handleNavMouseEnter = useCallback(() => {
        clearCloseTimer();
    }, [clearCloseTimer]);

    const handleNavMouseLeave = useCallback(() => {
        handleItemLeave();
    }, [handleItemLeave]);

    const { checkPermissionFor } = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor('login');
    const permissionToLogout = checkPermissionFor('logout');
    const [logout] = useLogoutMutation();
    const { t: tAuth } = useClientTranslation('auth');
    const { t: tNav } = useClientTranslation('navbar');

    const authDropdown = useDropdownManager();
    const langDropdown = useDropdownManager();

    const style = marginTop ? ({ marginTop: `${marginTop}px` } as CSSProperties) : {};

    const nonLogoItems = navbarBuild.menu.filter((item) => item.type !== 'navLogo');

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
            onMouseEnter={handleNavMouseEnter}
            onMouseLeave={handleNavMouseLeave}
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
                            <AppLink
                                key={item.name}
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
                        ))}
                </div>

                <ul className={cls.navLinks}>
                    {nonLogoItems.map((item) => {
                        if (item.type === 'navDropDown') {
                            const isOpen = hoveredItem === item.name;
                            const trigger = (
                                <>
                                    <span className={cls.col}>{tNav(`${item.name}`)}</span>
                                    {CHEVRON_ITEMS.has(item.name) && (
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className={classNames(cls.chevron, {
                                                [cls.chevronOpen]: isOpen,
                                            })}
                                        />
                                    )}
                                </>
                            );
                            return (
                                <li
                                    key={item.name}
                                    onMouseEnter={() => handleItemEnter(item.name)}
                                    onMouseLeave={handleItemLeave}
                                >
                                    {item.path ? (
                                        <AppLink
                                            theme={AppLinkTheme.PRIMARY}
                                            to={item.path}
                                            aria-haspopup="true"
                                            aria-expanded={isOpen}
                                        >
                                            {trigger}
                                        </AppLink>
                                    ) : (
                                        <span
                                            aria-haspopup="true"
                                            aria-expanded={isOpen}
                                        >
                                            {trigger}
                                        </span>
                                    )}
                                    <div
                                        className={classNames(cls.dropdownMenu, {
                                            [cls.dropdownMenuOpen]: isOpen,
                                        })}
                                        onMouseEnter={() => handleItemEnter(item.name)}
                                        onMouseLeave={handleItemLeave}
                                    >
                                        {item.elements.map((el, idx) => {
                                            if (
                                                el &&
                                                typeof el === 'object' &&
                                                'elementText' in el
                                            ) {
                                                return (
                                                    <div key={idx}>
                                                        {el.link ? (
                                                            <AppLink
                                                                to={el.link.path}
                                                                isExternal={el.link.isExternal}
                                                                className={cls.dropdownItem}
                                                            >
                                                                {tNav(`${el.elementText}`)}
                                                            </AppLink>
                                                        ) : (
                                                            <span className={cls.dropdownItem}>
                                                                {tNav(`${el.elementText}`)}
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            }
                                            return <div key={idx}>{el}</div>;
                                        })}
                                    </div>
                                </li>
                            );
                        }
                        return (
                            <li key={item.name}>
                                <AppLink
                                    theme={AppLinkTheme.PRIMARY}
                                    to={item.path}
                                >
                                    <span className={cls.col}>{tNav(`${item.name}`)}</span>
                                </AppLink>
                            </li>
                        );
                    })}
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
                                        <div className={cls.profileLabel}>
                                            {tAuth('ownProfile')}
                                        </div>
                                        <button
                                            className={cls.logoutButton}
                                            onClick={() => {
                                                logout();
                                            }}
                                        >
                                            {tAuth('logout')}
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
