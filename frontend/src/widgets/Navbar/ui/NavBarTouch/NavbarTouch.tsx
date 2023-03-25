import {CSSProperties, memo, useState} from "react";
import cls from "./NavbarTouch.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";
import navLogo from "@/shared/assets/images/altLogo.png";
import {Sidebar} from "@/widgets/Sidebar";
import {RoutePath} from "@/app/providers/router/config/routeConfig";

interface NavbarTouchProps {
    overlayed ?: boolean;
    marginTop?: number;
    onBurgerButtonClick?: (isMenuOpen: boolean) => void;
}

export default memo(( props : NavbarTouchProps) => {

    const {
        overlayed,
        marginTop,
    } = props;

    const style = marginTop
        ? ({ "marginTop": `${marginTop}px` } as CSSProperties)
        : {};

    const mods: Record<string, boolean> = {
        [cls.overlayed]: overlayed,
    } as Record<string, boolean>;

        return (
            <nav className={classNames(cls.Navbar, mods)} style={style}>
                <div className={cls.NavbarTouch}>
                    <Sidebar className={cls.NavbarTouch__left} SidebarItemsList={[{path : RoutePath.main , text : 'Main'},{path : RoutePath.main , text : 'Main'}]}/>
                    <img src={navLogo} alt="nav logo" className={cls.navLogo + ' ' + cls.NavbarTouch__center}
                    />
                </div>
            </nav>
        )

});
