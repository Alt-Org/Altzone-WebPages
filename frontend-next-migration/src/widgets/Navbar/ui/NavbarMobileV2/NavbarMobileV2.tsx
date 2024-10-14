import { useFixed } from "../../model/FixedProvider";
import useIsPageScrollbar from "@/shared/lib/hooks/useIsPageScrollbar";
import { defineNs } from "../../model/defineNs";


import {CSSProperties, memo, useMemo, useState} from "react";
import Image from 'next/image'
import { sidebarItemType } from "@/shared/ui/Sidebar/model/items";
import {useLogoutMutation, useUserPermissionsV2} from "@/entities/Auth";
import cls from "./NavbarMobileV2.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ISidebarItem, Sidebar } from "@/shared/ui/Sidebar";
import { ItemType, NavbarBuild, NavBarType } from "../../model/types";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import { useClientTranslation } from "@/shared/i18n";
import { LangSwitcher } from "@/features/LangSwitcher";
import { FixedButton } from "../FixedButton/FixedButton";


interface NavbarTouchProps {
    marginTop?: number;
    onBurgerButtonClick?: (isMenuOpen: boolean) => void;
    navbarBuild?: NavbarBuild;
    side?: 'left' | 'right';
    className?: string;
    navBarType?: NavBarType;
}

const NavbarTouchComponent = (props: NavbarTouchProps) => {

    const {
        marginTop,
        navbarBuild,
        side = 'left',
        className = '',
        navBarType = "Default"
    } = props;

    const ns = defineNs(navBarType)
    const { t } = useClientTranslation(ns);

    const {checkPermissionFor} = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor("login");
    const permissionToLogout = checkPermissionFor("logout");

    const permissionToSeeOwnClan = checkPermissionFor("clan:seeOwn");


    // todo looks like it should be moved to the feature layer
    const [logout] = useLogoutMutation();

    const { isFixed } = useFixed();
    const hasScrollbar = useIsPageScrollbar();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        setTimeout(() => setSidebarItemsListResetKey(currentKey => currentKey+1), 500);
    };

    const sidebarItemsList: ISidebarItem[] = useMemo(() => {
        return (navbarBuild?.menu || [])
            .map(item => {
                if (item.type === ItemType.navLink) {
                    return { path: item.path, name: t(`${item.name}`), type: sidebarItemType.ISidebarItemBasic };
                }
                if (item.type === ItemType.navDropDown) {
                    // Localize the elements within the dropdown, but skip if elementText equals "clanpage"
                    //todo looks like that this logic should not be here in ui component
                    const localizedElements = item.elements
                        .map((element) => {
                            if (element.elementText == 'clanpage' && !permissionToSeeOwnClan.isGranted) {
                                return null; // Return null if elementText is "clanpage"
                            }
                            return {
                                ...element,
                                elementText: t(`${element.elementText}`), // Localize elementText
                            };
                        })
                        .filter(element => element !== null); // Filter out any null elements
                    // If there are no valid elements left, return null to skip this item
                    if (localizedElements.length === 0) {
                        return null;
                    }

                    return { name: t(`${item.name}`), elements: localizedElements, type: sidebarItemType.ISidebarItemDropDown };
                }

                return null;
            })
            .filter(item => item !== null) as ISidebarItem[];
    }, [navbarBuild, t, isSidebarOpen]);

    const style: CSSProperties = marginTop
        ? { "marginTop": `${marginTop}px` }
        : {};

    const mods: Record<string, boolean> = {
        [cls.fixed]: isFixed,
    } as Record<string, boolean>;

    const sidebarMods: Record<string, boolean> = {
        [cls.left]: side === 'left',
        [cls.right]: side === 'right',
    };

    return (
        <nav className={classNames(cls.Navbar, mods, [className])} style={style} >
            <div
                className={classNames(cls.NavbarMobile__burger, sidebarMods)}
                onClick={handleBurgerClick}
            >
            </div>
            <Sidebar
                sidebarItemsListResetKey={sidebarItemsListResetKey}
                buttonClassName={classNames(cls.NavbarMobile__burger, sidebarMods)}
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
                                    to={navbarBuild?.namedMenu?.navAuthLogin?.path || ""}
                                    key={navbarBuild?.namedMenu?.navAuthLogin?.path || ""}
                                >
                                    <span>{t(`${navbarBuild?.namedMenu?.navAuthLogin?.name}`)}</span>
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
                className={cls.navLogo + ' ' + cls.NavbarMobile__center}
                theme={AppLinkTheme.PRIMARY}
                to={navbarBuild?.namedMenu?.navLogo?.path || ""}
            >
                <Image
                    loading={"eager"}
                    width={180}
                    src={navbarBuild?.namedMenu?.navLogo?.src || ''}
                    alt={navbarBuild?.namedMenu?.navLogo?.name || ''}
                />
            </AppLink>


            {hasScrollbar && (
                <FixedButton
                    className={cls.FixedButton}
                />
            )}
        </nav>
    )
};

NavbarTouchComponent.displayName = 'NavbarTouch';

export default memo(NavbarTouchComponent);
