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



export interface NavbarProps {
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
            {/*<Container>*/}
            <div className={cls.navMenu}>
                <div className={cls.leftSide}>
                    <NavbarItems
                        items={navbarMenu}
                        positionChecker={isLeftSide}
                        itemLinkClassname={itemLinkClassname}
                        itemLogoClassname={itemLogoClassname}
                        itemFakeLinkClassname={itemFakeLinkClassname}
                    />
                </div>
                <div className={cls.center}>
                    <NavbarItems
                        items={navbarMenu}
                        positionChecker={isCenter}
                        itemLinkClassname={itemLinkClassname}
                        itemLogoClassname={itemLogoClassname}
                        itemFakeLinkClassname={itemFakeLinkClassname}
                    />
                </div>
                <div className={cls.rightSide}>
                    <NavbarItems
                        items={navbarMenu}
                        positionChecker={isRightSide}
                        itemLinkClassname={itemLinkClassname}
                        itemLogoClassname={itemLogoClassname}
                        itemFakeLinkClassname={itemFakeLinkClassname}
                    />
                </div>
            </div>
            {/*</Container>*/}
        </nav>
    );


});



interface NavbarItemsProps {
    items: NavbarMenu;
    positionChecker: PositionChecker;
    itemLinkClassname: string;
    itemLogoClassname: string;
    itemFakeLinkClassname: string;
}

const NavbarItems = memo(
    ({
         items,
         positionChecker,
         itemLinkClassname,
         itemLogoClassname,
         itemFakeLinkClassname,
     }: NavbarItemsProps) => {
        return (
            <>
                {items
                    .filter((item) => positionChecker(item.position))
                    .map((item) => {
                        if (isNavbarLinkObject(item)) {
                            return (
                                <AppLink
                                    theme={AppLinkTheme.PRIMARY}
                                    to={item.path}
                                    className={itemLinkClassname}
                                    key={item.path}
                                >
                                    <span>{item.name}</span>
                                </AppLink>
                            );
                        }

                        if (isNavLogoObject(item)) {
                            return (
                                <AppLink
                                    theme={AppLinkTheme.PRIMARY}
                                    to={item.path}
                                    key={item.src}
                                >
                                    <img
                                        src={item.src}
                                        alt={item.name}
                                        className={itemLogoClassname}
                                        // loading="lazy"
                                    />
                                </AppLink>


                            );
                        }

                        if (isNavbarLinkFakeObject(item)) {
                            return (
                                <div
                                    className={itemFakeLinkClassname}
                                    key={item.reactKey}
                                >
                                    {item.name}
                                </div>
                            );
                        }

                        return null;
                    })}
            </>
        );
    }
);

