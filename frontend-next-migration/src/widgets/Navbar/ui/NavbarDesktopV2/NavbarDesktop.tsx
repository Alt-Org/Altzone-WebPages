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
import { LoginForm, RegisterForm } from '@/features/AuthByUsername';
import cls from './NavbarDesktop.module.scss';
import NavItem from './NavItem';
import profileIcon from '@/shared/assets/icons/profileIcon.svg';
import Image from 'next/image';
import { getRouteLoginPage, getRouteRegisterPage } from '@/shared/appLinks/RoutePaths';

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
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
    const [realPath, setRealPath] = useState('/');
    const pathname = usePathname();

    const style = marginTop ? ({ marginTop: `${marginTop}px` } as CSSProperties) : {};

    const mods: Record<string, boolean> = {
        [cls.fixed]: isFixed,
        [cls.collapsed]: isCollapsed,
        [cls.collapsing]: isAnimating,
    };

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

    const handleAuthSuccess = () => {
        authDropdown.actions.reset();
    };

    const toggleAuthMode = () => {
        setAuthMode(authMode === 'login' ? 'register' : 'login');
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
            className={classNames(cls.siteNav, mods, [className])}
            style={style}
            aria-label="Nav menu"
        >
            <Container>
                <ul
                    className={classNames(cls.siteNavContentList, ModsUlAndLi)}
                    onMouseEnter={handleNavbarMouseEnter}
                    onMouseLeave={handleNavbarMouseLeave}
                >
                    {navbarBuild.menu.map((item) => (
                        <NavItem
                            mouseOver={isMouseOver}
                            currentPath={realPath}
                            item={item}
                            key={item.name}
                            className={classNames('', ModsUlAndLi)}
                        />
                    ))}

                    <li
                        className={classNames(cls.navItem, ModsUlAndLi)}
                        key={'auth key'}
                    >
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
                                    {authMode === 'login' ? (
                                        <LoginForm
                                            toRegisterPage={getRouteRegisterPage()}
                                            onSuccessLogin={handleAuthSuccess}
                                            extraContent={
                                                <button
                                                    type="button"
                                                    onClick={toggleAuthMode}
                                                    className={cls.toggleAuthMode}
                                                >
                                                    {t('text_to_register')}
                                                </button>
                                            }
                                        />
                                    ) : (
                                        <RegisterForm
                                            toLoginPage={getRouteLoginPage()}
                                            extraContent={
                                                <button
                                                    type="button"
                                                    onClick={toggleAuthMode}
                                                    className={cls.toggleAuthMode}
                                                >
                                                    {t('text_to_login')}
                                                </button>
                                            }
                                        />
                                    )}
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
                                    <button
                                        className={cls.logoutButton}
                                        onClick={() => {
                                            logout();
                                            authDropdown.actions.reset();
                                        }}
                                    >
                                        {t('logout')}
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </li>

                    <li
                        className={classNames(cls.navItem, ModsUlAndLi)}
                        key={'switcher key'}
                    >
                        <div
                            onClick={() => handleDropdownClick('lang')}
                            style={{ cursor: 'pointer' }}
                        >
                            <LangSwitcher
                                className={cls.langSwitcher}
                                isOpen={langDropdown.state.isOpen && !isCollapsed}
                            />
                        </div>
                    </li>

                    {hasScrollbar && (
                        <li
                            data-testid="toggleFixButtonWrapper"
                            onTransitionEnd={handleTransitionEnd}
                            className={classNames(
                                cls.FixButtonWrapper,
                                { ...ModsUlAndLi, [cls.fixed]: !isFixed },
                                [cls.navItem],
                            )}
                        >
                            <ToggleFixButton
                                onClick={toggleFixed}
                                isFixed={isFixed}
                                className={cls.FixButton}
                            />
                        </li>
                    )}

                    {isFixed && (
                        <li
                            data-testid="collapseExpandWrapper"
                            className={classNames(cls.CollapseButtonWrapper, {
                                [cls.collapsing]: isAnimating,
                            })}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ToggleCollapseButton
                                onClick={handleCollapseClick}
                                isCollapsed={isCollapsed}
                                className={cls.CollapseButton}
                                disabled={isAnimating}
                            />
                        </li>
                    )}
                </ul>
            </Container>
        </nav>
    );
});

export default NavbarDesktop;
NavbarDesktop.displayName = 'NavbarDesktop';
