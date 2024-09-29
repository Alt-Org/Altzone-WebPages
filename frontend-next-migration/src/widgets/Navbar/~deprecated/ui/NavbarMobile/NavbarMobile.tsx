import {CSSProperties, memo, useMemo} from "react";
import Image from 'next/image'
import {sidebarItemType} from "@/shared/ui/Sidebar/model/items";
import {useLogoutMutation, useUserPermissionsV2} from "@/entities/Auth";
import cls from "./NavbarMobile.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";
import {ISidebarItem, Sidebar} from "@/shared/ui/Sidebar";
import {ItemType, NavbarBuild,} from "../../../model/types";
import {AppLink, AppLinkTheme} from "@/shared/ui/AppLink/AppLink";
import {useClientTranslation} from "@/shared/i18n";
import {LangSwitcher} from "@/features/LangSwitcher";

interface NavbarTouchProps {
    overlaid ?: boolean;
    marginTop?: number;
    onBurgerButtonClick?: (isMenuOpen: boolean) => void;
    navbarBuild?: NavbarBuild;
    side? : 'left'| 'right';
    className? : string;
}

const NavbarTouchComponent = ( props : NavbarTouchProps) => {

    const {
        overlaid = false,
        marginTop,
        navbarBuild,
        // navLogo,
        side = 'left',
        className = ''
    } = props;


    const style = marginTop
        ? ({ "marginTop": `${marginTop}px` } as CSSProperties)
        : {};

    const mods: Record<string, boolean> = {
        [cls.overlayed]: overlaid,
    } as Record<string, boolean>;

    const sidebarMods: Record<string, boolean> = {
        [cls.left] : side === 'left',
        [cls.right] : side === 'right',
    } as Record<string, boolean>;

    const {t} = useClientTranslation("navbar");

    const sidebarItemsList: ISidebarItem[] = useMemo(() => {
        return (navbarBuild?.menu || [])
            .map(item => {
                if (item.type === ItemType.navLink) {
                    return { path: item.path, name: t(`${item.name}`), type: sidebarItemType.ISidebarItemBasic };
                }
                if (item.type === ItemType.navDropDown) {
                    const localizedElements = item.elements.map((element) => ({
                        ...element,
                        elementText: t(`${element.elementText}`),
                    }));
                    return { name:  t(`${item.name}`), elements: localizedElements, type: sidebarItemType.ISidebarItemDropDown };
                }
                return null;
            })
            .filter(item => item !== null) as ISidebarItem[];
    }, [navbarBuild, t]);


    const {checkPermissionFor} = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor("login");
    const permissionToLogout = checkPermissionFor("logout");

    // todo looks like it should be moved to the feature layer
    const [logout] = useLogoutMutation();

    return (
        <nav className={classNames(cls.Navbar, mods, [className])} style={style}>


            <div className={cls.NavbarMobile}>

                <Sidebar
                    buttonClassName={classNames(cls.NavbarMobile__burger, sidebarMods)}
                    sidebarItemsList={sidebarItemsList}
                    side={side}
                    closeOnClickOutside
                    bottomItems={
                        <div className={cls.sidebarBottom}>
                            <LangSwitcher className={cls.langSwitcher}/>
                            <div className={cls.authSection}>
                                {
                                    permissionToLogin.isGranted &&  <AppLink
                                        className={cls.authSectionLink}
                                        theme={AppLinkTheme.PRIMARY}
                                        to={navbarBuild?.namedMenu?.navAuthLogin?.path || ""}
                                        key={navbarBuild?.namedMenu?.navAuthLogin?.path || ""}
                                    >
                                        <span>{t(`${navbarBuild?.namedMenu?.navAuthLogin?.name}`)}</span>
                                    </AppLink>
                                }

                                {
                                    permissionToLogout.isGranted &&
                                    <div onClick={()=>logout()}>{t(`logout`)}</div>
                                }

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
            </div>
        </nav>
    )

};

NavbarTouchComponent.displayName = 'NavbarTouch';

export default memo(NavbarTouchComponent);