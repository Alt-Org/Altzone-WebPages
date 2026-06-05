'use client';
import { CSSProperties, memo } from 'react';
import Image from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import { NavbarBuild } from '../../model/types';
import cls from './NavbarDesktop.module.scss';
import NavItem from './NavItem';
import profileIcon from '@/shared/assets/icons/profileIcon.svg';
import searchIcon from '@/shared/assets/icons/search.png';
import languageIcon from '@/shared/assets/icons/langIcon.svg';

export interface NavbarProps {
    /** Space above the navbar in pixels */
    marginTop?: number;
    /** Extra classes if you need to tweak the styling */
    className?: string;
    /** The menu items and logo that show up in the navbar */
    navbarBuild: NavbarBuild;
    /** When true the navbar shrinks down to a narrow collapsed state */
    isCollapsed?: boolean;
}

/**
 * The main nav bar for desktop users.
 *
 * Shows the logo, nav links, search, profile icon and language picker.
 * None of the buttons do anything yet — the functionality comes later.
 */
const NavbarDesktop = memo((props: NavbarProps) => {
    const { navbarBuild, marginTop, className = '', isCollapsed = false } = props;

    const style = marginTop ? ({ marginTop: `${marginTop}px` } as CSSProperties) : {};

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
                            />
                        ))}
                </div>

                <ul className={cls.navLinks}>
                    {navbarBuild.menu
                        .filter((item) => item.type !== 'navLogo')
                        .map((item) => (
                            <NavItem
                                key={item.name}
                                item={item}
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
                        <div className={cls.authContainer}>
                            <div className={cls.authTrigger}>
                                <Image
                                    src={profileIcon}
                                    alt="Profile"
                                    width={28}
                                    height={28}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cls.langSwitcher}>
                        <Image
                            src={languageIcon}
                            alt="Language"
                        />
                        <span>EN</span>
                    </div>
                </div>
            </div>
        </nav>
    );
});

NavbarDesktop.displayName = 'NavbarDesktopV3';

export default NavbarDesktop;
