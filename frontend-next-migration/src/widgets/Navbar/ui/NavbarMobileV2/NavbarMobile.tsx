import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CSSProperties, memo, useEffect, useMemo, useState, useRef } from 'react';
import { LangSwitcher } from '@/features/LangSwitcher';
import { useLogoutMutation, useUserPermissionsV2 } from '@/entities/Auth';
import useIsPageScrollbar from '@/shared/lib/hooks/useIsPageScrollbar';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { useClientTranslation } from '@/shared/i18n';
import profileIcon from '@/shared/assets/icons/profileIcon.svg';
import hamburgerIcon from '@/shared/assets/icons/hamburgerIcon.svg';
import closeIcon from '@/shared/assets/icons/closeIcon.svg';
import { ItemType, NavbarBuild } from '../../model/types';
import { ToggleFixButton } from '../ToggleFixButton/ToggleFixButton';
import cls from './NavbarMobile.module.scss';
import { NavMenu, INavMenuItem, NavMenuItemType } from '@/shared/ui/NavMenu';

enum DropdownTypes {
    EMPTY = 'EMPTY',
    HAMBURGER = 'HAMBURGER',
    AUTH = 'AUTH',
}

type DropdownType = DropdownTypes.EMPTY | DropdownTypes.HAMBURGER | DropdownTypes.AUTH;

export interface NavbarTouchProps {
    marginTop?: number;
    onBurgerButtonClick?: (isMenuOpen: boolean) => void;
    navbarBuild?: NavbarBuild;
    side?: 'left' | 'right';
    className?: string;
    isFixed: boolean;
    isCollapsed: boolean;
    toggleCollapsed: () => void;
    toggleFixed: () => void;
}

const NavbarTouchComponent = (props: NavbarTouchProps) => {
    const { marginTop, navbarBuild, side = 'left', className = '', toggleFixed, isFixed } = props;

    const { t } = useClientTranslation('navbar');

    const { checkPermissionFor } = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor('login');
    const permissionToLogout = checkPermissionFor('logout');

    const permissionToSeeOwnClan = checkPermissionFor('clan:seeOwn');

    // todo looks like it should be moved to the feature layer
    const [logout] = useLogoutMutation();

    const hasScrollbar = useIsPageScrollbar();

    const [dropdownType, setDropdownType] = useState<DropdownType>(DropdownTypes.EMPTY);

    const [realPath, setRealPath] = useState('/');
    const pathname = usePathname();

    useEffect(() => {
        const pathSegments = pathname.split('/').filter(Boolean);
        const newPath = pathSegments.length === 1 ? '/' : `/${pathSegments[1] || ''}`;
        setRealPath(newPath);
    }, [pathname]);

    const navManuItemsList: INavMenuItem[] = useMemo(() => {
        return (navbarBuild?.menu || [])
            .map((item) => {
                if (item.type === ItemType.navLink) {
                    return {
                        path: item.path,
                        name: t(`${item.name}`),
                        type: NavMenuItemType.Link,
                        active: realPath === item.path,
                    };
                }
                if (item.type === ItemType.navDropDown) {
                    // Localize the elements within the dropdown, but skip if elementText equals "clanpage"
                    //todo looks like that this logic should not be here in ui component
                    const localizedElements = item.elements
                        .map((element) => {
                            if (
                                // @ts-ignore todo add guard
                                element.elementText === 'clanpage' &&
                                !permissionToSeeOwnClan.isGranted
                            ) {
                                return null; // Return null if elementText is "clanpage"
                            }
                            return {
                                // @ts-ignore todo add guard
                                ...element,
                                // @ts-ignore todo add guard
                                elementText: t(`${element.elementText}`), // Localize elementText
                                // @ts-ignore
                                active: realPath === element?.link?.path,
                            };
                        })
                        .filter((element) => element !== null); // Filter out any null elements

                    const isDropdownActive = localizedElements.some((element) => element.active);

                    // If there are no valid elements left, return null to skip this item
                    if (localizedElements.length === 0) {
                        return null;
                    }

                    return {
                        name: t(`${item.name}`),
                        elements: localizedElements,
                        active: isDropdownActive,
                        type: NavMenuItemType.Dropdown,
                    };
                }

                return null;
            })
            .filter((item) => item !== null) as INavMenuItem[];
    }, [t, navbarBuild?.menu, permissionToSeeOwnClan.isGranted, realPath]);

    const style: CSSProperties = marginTop ? { marginTop: `${marginTop}px` } : {};

    const mods: Record<string, boolean> = {
        [cls.fixed]: isFixed,
        [cls.openDropdown]: dropdownType !== DropdownTypes.EMPTY,
    } as Record<string, boolean>;

    const dropdownContent = {
        [DropdownTypes.EMPTY]: null,
        [DropdownTypes.HAMBURGER]: (
            <NavMenu
                // todo langswitcher could be in navbarmobile data and not hardcoded here
                dropdownItems={navManuItemsList.concat([
                    {
                        type: NavMenuItemType.Element,
                        element: <LangSwitcher className={cls.langSwitcher} />,
                    },
                ])}
            />
        ),
        [DropdownTypes.AUTH]: (
            <div>
                {permissionToLogin.isGranted ? (
                    <p>Login</p>
                ) : permissionToLogout.isGranted ? (
                    <>
                        <AppLink to="/profile">{t('profile')}</AppLink>
                        <button
                            className={cls.logoutButton}
                            onClick={() => logout()}
                        >
                            {t('logout')}
                        </button>
                    </>
                ) : null}
            </div>
        ),
    };

    const getDropdownContent = (dropdownType: DropdownType) => {
        if (dropdownType === DropdownTypes.EMPTY) {
            return null;
        }
        return (
            <div className={`${cls.NavbarDropdown} ${cls.test}`}>
                {dropdownContent[dropdownType]}
            </div>
        );
    };

    return (
        <nav
            className={classNames(cls.Navbar, mods, [className])}
            style={style}
        >
            {/* <DropdownBox
        //     className={classNames(cls.Navbar, mods, [className])}
        //     style={style}
        //     ref={ref}
        // > */}
            <div className={cls.NavbarContent}>
                <div className={cls.HamurgerBtn}>
                    {dropdownType !== DropdownTypes.EMPTY ? (
                        <Image
                            src={closeIcon}
                            alt="X shaped svg image. For closing navigation bar menus."
                            width={20}
                            height={20}
                            onClick={() => setDropdownType(DropdownTypes.EMPTY)}
                        />
                    ) : (
                        <Image
                            src={hamburgerIcon}
                            alt="Three vertical lines. Is svg image in the open navigation menu button."
                            width={26}
                            height={20}
                            onClick={() => setDropdownType(DropdownTypes.HAMBURGER)}
                        />
                    )}
                </div>
                <AppLink
                    className={classNames(
                        cls.navLogo + ' ' + cls.NavbarMobile__center + ' ' + cls.navItem,
                        // { [cls.collapsed]: isCollapsed },
                        {},
                        [],
                    )}
                    theme={AppLinkTheme.PRIMARY}
                    to={navbarBuild?.namedMenu?.navLogo?.path || ''}
                >
                    <Image
                        loading={'eager'}
                        // width={180}
                        src={navbarBuild?.namedMenu?.navLogo?.src || ''}
                        alt={navbarBuild?.namedMenu?.navLogo?.name || ''}
                    />
                </AppLink>
                <div className={cls.buttonContainer}>
                    <Image
                        src={profileIcon}
                        alt="icon of a person inside a circle"
                        width={20}
                        height={20}
                        onClick={() =>
                            setDropdownType(
                                dropdownType === DropdownTypes.AUTH
                                    ? DropdownTypes.EMPTY
                                    : DropdownTypes.AUTH,
                            )
                        }
                    />
                    {hasScrollbar && (
                        <div className={classNames(cls.navItem)}>
                            <ToggleFixButton
                                isFixed={isFixed}
                                onClick={toggleFixed}
                                className={cls.Button}
                            />
                        </div>
                    )}
                </div>
            </div>
            {getDropdownContent(dropdownType)}
        </nav>
    );
};

NavbarTouchComponent.displayName = 'NavbarTouch';

export default memo(NavbarTouchComponent);
