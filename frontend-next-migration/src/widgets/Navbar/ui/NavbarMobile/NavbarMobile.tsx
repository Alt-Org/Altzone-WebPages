import Image from 'next/image';
import { CSSProperties, memo, useMemo, useState } from 'react';
import { LangSwitcher } from '@/features/LangSwitcher';
import { useLogoutMutation, useUserPermissionsV2 } from '@/entities/Auth';
import useIsPageScrollbar from '@/shared/lib/hooks/useIsPageScrollbar';
import { sidebarItemType } from '@/shared/ui/Sidebar/model/items';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ISidebarItem, Sidebar } from '@/shared/ui/Sidebar';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { useClientTranslation } from '@/shared/i18n';
import { useCollapsed } from '../../model/CollapsedProvider';
import { defineNs } from '../../model/defineNs';
import { useFixed } from '../../model/FixedProvider';
import { ItemType, NavbarBuild, NavBarType } from '../../model/types';
import { ToggleCollapseButton } from '../ToggleCollapseButton/ToggleCollapseButton';
import { ToggleFixButton } from '../ToggleFixButton/ToggleFixButton';
import cls from './NavbarMobile.module.scss';

/**
 * Properties for NavbarTouchComponent component
 *
 * @property {number} marginTop Margin at the top
 * @property {(isMenuOpen: boolean) => void} onBurgerButtonClick The function is informed in the button event whether the sidebar is open.
 * @property {string} className Additional CSS classes
 * @property {string} side On which side does the sidebar appear?
 * @property {NavbarBuild} navbarBuild Navigation bar components according to usage type and view size
 * @property {NavBarType} navNarType Navbar type
 */
interface NavbarTouchProps {
    marginTop?: number;
    onBurgerButtonClick?: (isMenuOpen: boolean) => void;
    navbarBuild?: NavbarBuild;
    side?: 'left' | 'right';
    className?: string;
    navBarType?: NavBarType;
}

/**
 * NavbarTouchComponent includes a button that opens a menu-style sidebar for navigation.
 * The Sidebar also includes language switcher and login/logout functionality.
 * NavbarTouchComponent contains an Alt logo that links to the homepage. On the right side of
 * NavbarTouchComponent, there are buttons for the fixed and collapse functionalities.
 *
 * This component must be used as a child of `FixedProvider` and `CollapsedProvider`.
 *
 * - When in `Fixed` mode, the navbar remains visible as the page scrolls.
 * - In `collapse` mode, the navbar is hidden.
 *
 * @param {NavbarTouchProps} props Properties for NavbarTouchComponent component
 * @returns NavbarTouchComponent
 */
const NavbarTouchComponent = (props: NavbarTouchProps) => {
    const { marginTop, navbarBuild, side = 'left', className = '', navBarType = 'Default' } = props;

    const ns = defineNs(navBarType);
    const { t } = useClientTranslation(ns);

    const { checkPermissionFor } = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor('login');
    const permissionToLogout = checkPermissionFor('logout');

    const permissionToSeeOwnClan = checkPermissionFor('clan:seeOwn');

    // todo looks like it should be moved to the feature layer
    const [logout] = useLogoutMutation();

    const { isFixed, toggleFixed } = useFixed();
    const { isCollapsed, toggleCollapsed } = useCollapsed();
    const hasScrollbar = useIsPageScrollbar();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // A crutch to reset dropdowns when closing the navbar
    const [sidebarItemsListResetKey, setSidebarItemsListResetKey] = useState(0);
    const handleBurgerClick = () => {
        setIsSidebarOpen(true);
        props.onBurgerButtonClick?.(true);
    };
    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
        props.onBurgerButtonClick?.(false);
        // we should give some time for animation
        setTimeout(() => setSidebarItemsListResetKey((currentKey) => currentKey + 1), 500);
    };

    const sidebarItemsList: ISidebarItem[] = useMemo(() => {
        return (navbarBuild?.menu || [])
            .map((item) => {
                if (item.type === ItemType.navLink) {
                    return {
                        path: item.path,
                        name: t(`${item.name}`),
                        type: sidebarItemType.ISidebarItemBasic,
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
                            };
                        })
                        .filter((element) => element !== null); // Filter out any null elements
                    // If there are no valid elements left, return null to skip this item
                    if (localizedElements.length === 0) {
                        return null;
                    }

                    return {
                        name: t(`${item.name}`),
                        elements: localizedElements,
                        type: sidebarItemType.ISidebarItemDropDown,
                    };
                }

                return null;
            })
            .filter((item) => item !== null) as ISidebarItem[];
    }, [navbarBuild, t, isSidebarOpen]);

    const style: CSSProperties = marginTop ? { marginTop: `${marginTop}px` } : {};

    const mods: Record<string, boolean> = {
        [cls.fixed]: isFixed,
        [cls.collapsed]: isCollapsed,
        [cls.collapsing]: isAnimating,
    } as Record<string, boolean>;

    const sidebarMods: Record<string, boolean> = {
        [cls.left]: side === 'left',
        [cls.right]: side === 'right',
        [cls.collapsed]: isCollapsed,
    };

    const handleCollapseClick = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            toggleCollapsed();
        }
    };

    const handleTransitionEnd = () => {
        setIsAnimating(false);
    };
    return (
        <nav
            className={classNames(cls.Navbar, mods, [className])}
            style={style}
        >
            <div
                className={classNames(cls.NavbarMobile__burger, sidebarMods)}
                onClick={handleBurgerClick}
            />
            <Sidebar
                sidebarItemsListResetKey={sidebarItemsListResetKey}
                buttonClassName={classNames(
                    cls.NavbarMobile__burger + ' ' + cls.navItem,
                    sidebarMods,
                )}
                sidebarClassName={cls.sidebar}
                sidebarItemsList={sidebarItemsList}
                side={side}
                closeOnClickOutside
                onClose={handleSidebarClose}
                bottomItems={
                    <div className={cls.sidebarBottom}>
                        <LangSwitcher className={cls.langSwitcher} />
                        <div className={cls.authSection}>
                            {permissionToLogin.isGranted && (
                                <AppLink
                                    className={cls.authSectionLink}
                                    theme={AppLinkTheme.PRIMARY}
                                    to={navbarBuild?.namedMenu?.navAuthLogin?.path || ''}
                                    key={navbarBuild?.namedMenu?.navAuthLogin?.path || ''}
                                >
                                    <span>
                                        {t(`${navbarBuild?.namedMenu?.navAuthLogin?.name}`)}
                                    </span>
                                </AppLink>
                            )}
                            {permissionToLogout.isGranted && (
                                <div onClick={() => logout()}>{t(`logout`)}</div>
                            )}
                        </div>
                    </div>
                }
            />
            <AppLink
                className={classNames(
                    cls.navLogo + ' ' + cls.NavbarMobile__center + ' ' + cls.navItem,
                    { [cls.collapsed]: isCollapsed },
                    [],
                )}
                theme={AppLinkTheme.PRIMARY}
                to={navbarBuild?.namedMenu?.navLogo?.path || ''}
            >
                <Image
                    loading={'eager'}
                    width={180}
                    src={navbarBuild?.namedMenu?.navLogo?.src || ''}
                    alt={navbarBuild?.namedMenu?.navLogo?.name || ''}
                />
            </AppLink>
            <div className={cls.buttonContainer}>
                {hasScrollbar && (
                    <div
                        className={classNames(cls.navItem, { [cls.collapsed]: isCollapsed })}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        <ToggleFixButton
                            isFixed={isFixed}
                            onClick={toggleFixed}
                            className={cls.Button}
                        />
                    </div>
                )}
                {/*{isFixed && (*/}
                {/*    <div*/}
                {/*        className={classNames(cls.CollapseButtonWrapper, {*/}
                {/*            [cls.collapsing]: isAnimating,*/}
                {/*        })}*/}
                {/*    >*/}
                {/*        <ToggleCollapseButton*/}
                {/*            onClick={handleCollapseClick}*/}
                {/*            isCollapsed={isCollapsed}*/}
                {/*            className={cls.Button}*/}
                {/*            disabled={isAnimating}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </nav>
    );
};

NavbarTouchComponent.displayName = 'NavbarTouch';

export default memo(NavbarTouchComponent);
