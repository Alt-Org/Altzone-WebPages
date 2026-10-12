'use client';
import Image from 'next/image';
import { CSSProperties, memo, useMemo, useState } from 'react';
import { useLogoutMutation, useUserPermissionsV2 } from '@/entities/Auth';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useClientTranslation } from '@/shared/i18n';
import { LoginForm } from '@/features/AuthByUsername';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { NavMenu, INavMenuItem, NavMenuItemType } from '@/shared/ui/NavMenu';
import { ItemType, NavbarBuild } from '../../model/types';
import cls from './NavbarMobile.module.scss';
import profileIcon from '@/shared/assets/icons/profileIcon.svg';
import hamburgerIcon from '@/shared/assets/icons/hamburgerIcon.svg';
import closeIcon from '@/shared/assets/icons/closeIcon.svg';

type DropdownType = 'hamburger' | 'auth' | null;

export interface NavbarTouchProps {
    marginTop?: number;
    navbarBuild?: NavbarBuild;
    className?: string;
}

const NavbarTouchComponent = (props: NavbarTouchProps) => {
    const { marginTop, navbarBuild, className = '' } = props;
    const { t } = useClientTranslation('navbar');
    const { t: tAuth } = useClientTranslation('auth');

    const { checkPermissionFor } = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor('login');
    const permissionToLogout = checkPermissionFor('logout');
    const [logout] = useLogoutMutation();

    const [dropdownType, setDropdownType] = useState<DropdownType>(null);

    const style: CSSProperties = marginTop ? { marginTop: `${marginTop}px` } : {};

    const closeDropdown = () => setDropdownType(null);

    const navManuItemsList: INavMenuItem[] = useMemo(() => {
        return (navbarBuild?.menu || [])
            .filter((item) => item.type === ItemType.navLink)
            .map((item) => ({
                path: item.path,
                name: t(`${item.name}`),
                type: NavMenuItemType.Link,
                active: false,
            }));
    }, [t, navbarBuild?.menu]);

    return (
        <nav
            className={className ? `${cls.Navbar} ${className}` : cls.Navbar}
            style={style}
        >
            <div className={cls.NavbarContent}>
                <div className={cls.buttonContainer}>
                    <div
                        data-testid="mobile-navbar-profile-button"
                        onClick={() => setDropdownType(dropdownType === 'auth' ? null : 'auth')}
                    >
                        <Image
                            src={profileIcon}
                            alt="Profile"
                            width={20}
                            height={20}
                        />
                    </div>
                </div>

                <AppLink
                    className={`${cls.navLogo} ${cls.NavbarMobile__center} ${cls.navItem}`}
                    theme={AppLinkTheme.PRIMARY}
                    to={navbarBuild?.namedMenu?.navLogo?.path || ''}
                >
                    <Image
                        loading="eager"
                        src={navbarBuild?.namedMenu?.navLogo?.src || ''}
                        alt={navbarBuild?.namedMenu?.navLogo?.name || ''}
                    />
                </AppLink>

                <div className={cls.HamurgerBtn}>
                    {dropdownType === 'hamburger' ? (
                        <div onClick={() => setDropdownType(null)}>
                            <Image
                                src={closeIcon}
                                alt="Close menu"
                                width={20}
                                height={20}
                            />
                        </div>
                    ) : (
                        <div onClick={() => setDropdownType('hamburger')}>
                            <Image
                                src={hamburgerIcon}
                                alt="Open menu"
                                width={26}
                                height={20}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div
                className={classNames(cls.NavbarDropdown, {
                    [cls.openDropdown]: dropdownType !== null,
                })}
            >
                {dropdownType === 'hamburger' && <NavMenu dropdownItems={navManuItemsList} />}
                {dropdownType === 'auth' && (
                    <div className={cls.authDropdownContent}>
                        {permissionToLogin.isGranted ? (
                            <LoginForm onSuccessLogin={closeDropdown} />
                        ) : permissionToLogout.isGranted ? (
                            <div className={cls.authFormContainer}>
                                <div className={cls.profileLabel}>{tAuth('ownProfile')}</div>
                                <button
                                    className={cls.logoutButton}
                                    onClick={() => {
                                        logout();
                                        closeDropdown();
                                    }}
                                >
                                    {tAuth('logout')}
                                </button>
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        </nav>
    );
};

NavbarTouchComponent.displayName = 'NavbarTouch';

export default memo(NavbarTouchComponent);
