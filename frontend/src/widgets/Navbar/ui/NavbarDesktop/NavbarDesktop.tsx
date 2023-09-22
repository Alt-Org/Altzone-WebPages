import {classNames} from "@/shared/lib/classNames/classNames";
import {CSSProperties, memo} from "react";
import cls from "./NavbarDesktop.module.scss";
import {AppLink, AppLinkTheme} from "@/shared/ui/AppLink/AppLink";
import {NavbarMenu, PositionChecker} from "../../model/types/types";
import {
    isCenter,
    isLeftSide, isNavbarDropDownObject,
    isNavbarLinkFakeObject,
    isNavbarLinkObject,
    isNavLogoObject,
    isRightSide
} from "../../model/types/type.guards";
import {DropdownWrapper} from "@/shared/ui/DropdownWrapper";
import {navbarMenuLoginProfile} from "@/widgets/Navbar/model/data/navbarMenuDesktop";



export interface NavbarProps {
    overlayed ?: boolean;
    marginTop?: number;
    className?: string;
    navbarMenu:  NavbarMenu

}

export default memo(( props : NavbarProps) => {

    const {
        overlayed = false,
        marginTop,
        navbarMenu,
        className=''
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
    const itemNavbarDropDownClassname = cls.item + ' ' + cls.itemNavbarDropDown;



    return (
        <nav className={classNames(cls.Navbar, mods, [className])} style={style}>
            <div className={cls.navMenu}>
                <div className={cls.leftSide}>
                    <NavbarItems
                        items={navbarMenu}
                        positionChecker={isLeftSide}
                        itemLinkClassname={itemLinkClassname}
                        itemLogoClassname={itemLogoClassname}
                        itemFakeLinkClassname={itemFakeLinkClassname}
                        itemNavbarDropDownClassname={itemNavbarDropDownClassname}
                    />
                </div>
                <div className={cls.center}>
                    <NavbarItems
                        itemNavbarDropDownClassname={itemNavbarDropDownClassname}
                        items={navbarMenu}
                        positionChecker={isCenter}
                        itemLinkClassname={itemLinkClassname}
                        itemLogoClassname={itemLogoClassname}
                        itemFakeLinkClassname={itemFakeLinkClassname}
                    />
                </div>
                <div className={cls.rightSide}>

                    <NavbarItems
                        itemNavbarDropDownClassname={itemNavbarDropDownClassname}
                        items={navbarMenu}
                        positionChecker={isRightSide}
                        itemLinkClassname={itemLinkClassname}
                        itemLogoClassname={itemLogoClassname}
                        itemFakeLinkClassname={itemFakeLinkClassname}
                    />


                    <div className={cls.rightSideAuth}>
                        <AppLink
                            className={cls.rightSideAuthLink}
                            theme={AppLinkTheme.PRIMARY}
                            to={navbarMenuLoginProfile.login.path}
                            key={navbarMenuLoginProfile.login.path}
                        >
                            <span>{navbarMenuLoginProfile.login.name}</span>
                        </AppLink>
                    </div>
                </div>

            </div>
        </nav>
    );


});



interface NavbarItemsProps {
    items: NavbarMenu;
    positionChecker: PositionChecker;
    itemLinkClassname: string;
    itemLogoClassname: string;
    itemFakeLinkClassname: string;
    itemNavbarDropDownClassname: string
}

const NavbarItems = memo(
    ({
         items,
         positionChecker,
         itemLinkClassname,
         itemLogoClassname,
         itemFakeLinkClassname,
         itemNavbarDropDownClassname,
     }: NavbarItemsProps) => {

        return (
            <>
                {items
                    // @ts-ignore
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

                        if (isNavbarDropDownObject(item)) {
                            return (
                                <DropdownWrapper elements={item.elements} contentAbsolute={true}
                                                 className={itemNavbarDropDownClassname}
                                                 childrenWrapperClassName={cls.itemNavbarDropDownChildrenWrapper}
                                                 contentClassName={cls.itemNavbarDropDownContentClassName}
                                >
                                    <div>{item.name}</div>
                                </DropdownWrapper>
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

