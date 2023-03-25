import {CSSProperties, memo, useMemo} from "react";
import cls from "./NavbarTouch.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";
import navLogo from "@/shared/assets/images/altLogo.png";
import {Sidebar, SidebarItemType} from "@/shared/ui/Sidebar";
import {NavbarMenuTouch} from "../../model/types/types";

interface NavbarTouchProps {
    overlayed ?: boolean;
    marginTop?: number;
    onBurgerButtonClick?: (isMenuOpen: boolean) => void;
    navBarItemsList?: NavbarMenuTouch;
    side? : 'left'| 'right'
}

export default memo(( props : NavbarTouchProps) => {

    const {
        overlayed,
        marginTop,
        navBarItemsList,
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
                <div className={cls.NavbarTouch}>
                    <Sidebar className={classNames(cls.NavbarTouch__burger, sidebarMods)} sidebarItemsList={sidebarItemsList} side={side} />
                    <img src={navLogo} alt="nav logo" className={cls.navLogo + ' ' + cls.NavbarTouch__center}
                    />
                </div>
            </nav>
        )

});
