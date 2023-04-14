import {CSSProperties, memo, useMemo} from "react";
import cls from "./NavbarMobile.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";
import {Sidebar, SidebarItemType} from "@/shared/ui/Sidebar";
import {NavbarMenuMobile} from "../../model/types/types";
import {AppLink, AppLinkTheme} from "@/shared/ui/AppLink/AppLink";
import {navLogoMobile} from "@/widgets/Navbar/model/data/navbarMenuMobile";



interface NavbarTouchProps {
    overlayed ?: boolean;
    marginTop?: number;
    onBurgerButtonClick?: (isMenuOpen: boolean) => void;
    navBarItemsList?: NavbarMenuMobile;
    // navLogo : NavLogoMobileObject;
    side? : 'left'| 'right'
}

export default memo(( props : NavbarTouchProps) => {

    const {
        overlayed,
        marginTop,
        navBarItemsList,
        // navLogo,
        side = 'left'
    } = props;

    const style = marginTop
        ? ({ "marginTop": `${marginTop}px` } as CSSProperties)
        : {};

    const mods: Record<string, boolean> = {
        [cls.overlayed]: overlayed,
    } as Record<string, boolean>;

    const sidebarMods: Record<string, boolean> = {
        [cls.left] : side === 'left',
        [cls.right] : side === 'right',
    } as Record<string, boolean>;

    const sidebarItemsList: SidebarItemType[] = useMemo(
        () =>
            navBarItemsList
                ? navBarItemsList.map((item) => ({ path: item.path, name: item.name }))
                : [],
        [navBarItemsList]
    );

        return (
            <nav className={classNames(cls.Navbar, mods)} style={style}>
                <div className={cls.NavbarMobile}>
                    <Sidebar buttonClassName={classNames(cls.NavbarMobile__burger, sidebarMods)} sidebarItemsList={sidebarItemsList} side={side} closeOnClickOutside />
                    <AppLink
                        className={cls.navLogo + ' ' + cls.NavbarMobile__center}
                        theme={AppLinkTheme.PRIMARY}
                        to={navLogoMobile.path}
                    >
                        <img src={navLogoMobile.src}
                             alt={navLogoMobile.name}
                        />
                    </AppLink>
                </div>
            </nav>
        )

});
