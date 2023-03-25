import {classNames} from "@/shared/lib/classNames/classNames";
import {CSSProperties, memo} from "react";
import cls from "./NavbarDesktop.module.scss";
import {AppLink, AppLinkTheme} from "@/shared/ui/AppLink/AppLink";
import {NavbarMenu, PositionChecker} from "../../model/types/types";
import {
    isCenter,
    isLeftSide,
    isNavbarLinkFakeObject,
    isNavbarLinkObject,
    isNavLogoObject,
    isRightSide
} from "../../model/types/type.guards";


interface NavbarProps {
    overlayed ?: boolean;
    marginTop?: number;
    navbarMenu:  NavbarMenu
}

export default memo(( props : NavbarProps) => {

    const {
        overlayed,
        marginTop,
        navbarMenu
    } = props;

    const style = marginTop
        ? ({ "marginTop": `${marginTop}px` } as CSSProperties)
        : {};

    const mods: Record<string, boolean> = {
        [cls.overlayed]: overlayed,
    } as Record<string, boolean>;

    const itemLinkClassname = cls.item + ' ' + cls.itemLink;
    const itemLogoClassname = cls.item + ' ' + cls.navLogo;
    const itemFakeLinkClassname = cls.item + ' ' + cls.fakeItemLink;

    return (
        <nav className={classNames(cls.Navbar, mods)} style={style}>
            <div className={cls.navMenu}>

                <div className={cls.leftSide}>
                    {renderNavbarItems(navbarMenu, isLeftSide, itemLinkClassname ,itemLogoClassname ,itemFakeLinkClassname)}
                </div>


                <div className={cls.center}>
                    {renderNavbarItems(navbarMenu, isCenter, itemLinkClassname ,itemLogoClassname,itemFakeLinkClassname)}
                </div>


                <div className={cls.rightSide}>
                    {renderNavbarItems(navbarMenu, isRightSide, itemLinkClassname ,itemLogoClassname,itemFakeLinkClassname)}
                </div>
            </div>
        </nav>
    );

});



const renderNavbarItems = ( items: NavbarMenu , positionChecker: PositionChecker, itemLinkClassname: string, itemLogoClassname: string , itemFakeLinkClassname: string) => {
    return items
        .filter((item) => positionChecker(item.position))
        .map((item) => {
            if (isNavbarLinkObject(item)) {
                return (
                    <AppLink theme={AppLinkTheme.PRIMARY} to={item.path} className={itemLinkClassname} key={item.path}>
                        <span>{item.name}</span>
                    </AppLink>
                );
            }

            if (isNavLogoObject(item)) {
                return (
                    <img
                        key={item.src}
                        src={item.src}
                        alt={item.name}
                        className={itemLogoClassname}
                        // loading="lazy"
                    />
                );
            }

            if(isNavbarLinkFakeObject(item)){
                return (
                   <div className={itemFakeLinkClassname} key={item.reactKey}>{item.name}</div>
                )
            }

        });
};