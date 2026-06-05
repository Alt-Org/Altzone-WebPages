'use client';
import Image from 'next/image';
import { CSSProperties, memo, useMemo, useState } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { NavMenu, INavMenuItem, NavMenuItemType } from '@/shared/ui/NavMenu';
import { ItemType, NavbarBuild } from '../../model/types';
import cls from './NavbarMobile.module.scss';
import profileIcon from '@/shared/assets/icons/profileIcon.svg';
import hamburgerIcon from '@/shared/assets/icons/hamburgerIcon.svg';
import closeIcon from '@/shared/assets/icons/closeIcon.svg';

export interface NavbarTouchProps {
    marginTop?: number;
    navbarBuild?: NavbarBuild;
    className?: string;
}

const NavbarTouchComponent = (props: NavbarTouchProps) => {
    const { marginTop, navbarBuild, className = '' } = props;
    const { t } = useClientTranslation('navbar');

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const style: CSSProperties = marginTop ? { marginTop: `${marginTop}px` } : {};

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
                    <Image
                        src={profileIcon}
                        alt="Profile"
                        width={20}
                        height={20}
                    />
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
                    {isMenuOpen ? (
                        <div onClick={() => setIsMenuOpen(false)}>
                            <Image
                                src={closeIcon}
                                alt="Close menu"
                                width={20}
                                height={20}
                            />
                        </div>
                    ) : (
                        <div onClick={() => setIsMenuOpen(true)}>
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
                    [cls.openDropdown]: isMenuOpen,
                })}
            >
                {isMenuOpen && <NavMenu dropdownItems={navManuItemsList} />}
            </div>
        </nav>
    );
};

NavbarTouchComponent.displayName = 'NavbarTouch';

export default memo(NavbarTouchComponent);
