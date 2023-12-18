import {CSSProperties, memo, useEffect, useLayoutEffect, useRef, useState} from "react";
import Image from 'next/image'
import {AppLink, AppLinkTheme} from "@/shared/ui/AppLink/AppLink";
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./NavbarDesktop.module.scss";
import {NavbarMenu, PositionChecker} from "../../model/types/types";
import {
    isCenter,
    isLeftSide,
    isNavbarDropDownObject,
    isNavbarLinkFakeObject,
    isNavbarLinkObject,
    isNavLogoObject,
    isRightSide
} from "../../model/types/type.guards";
import {DropdownWrapper} from "@/shared/ui/DropdownWrapper";
import {navbarMenuLoginProfile} from "@/widgets/Navbar/model/data/navbarMenuDesktop";

import {useLogoutMutation, useUserPermissions} from "@/entities/Auth";
import {navLogoMobile} from "@/widgets/Navbar/model/data/navbarMenuMobile";
import {useParams} from "next/navigation";
import {useClientTranslation} from "@/shared/i18n";



export interface NavbarProps {
    overlaid ?: boolean;
    marginTop?: number;
    className?: string;
    navbarMenu:  NavbarMenu

}

export const NavbarDesktop = ( props : NavbarProps) => {

    const {
        overlaid = false,
        marginTop,
        navbarMenu,
        className=''
    } = props;

    const style = marginTop
        ? ({ "marginTop": `${marginTop}px` } as CSSProperties)
        : {};

    const mods: Record<string, boolean> = {
        [cls.overlayed]: overlaid,
    } as Record<string, boolean>;

    const itemLinkClassname = cls.item + ' ' + cls.itemLink;
    const itemLogoClassname = cls.item + ' ' + cls.navLogo;
    const itemFakeLinkClassname = cls.item + ' ' + cls.fakeItemLink;
    const itemNavbarDropDownClassname = cls.item + ' ' + cls.itemNavbarDropDown;

    const {canI} = useUserPermissions();

    const [logout] = useLogoutMutation();

    const params = useParams();
    const lng = params.lng as string;
    const {t} = useClientTranslation(lng, "navbar");


    const rightSideRef = useRef(null);
    const [distToRightBorder , setDistToRightBorder] = useState<number>();


    useLayoutEffect(() => {
        const rightSideElement = rightSideRef.current;

        if (rightSideElement) {
            // @ts-ignore
            const lastChild = rightSideElement.lastElementChild;
            // @ts-ignore
            const distanceToRight = rightSideElement.getBoundingClientRect().right - lastChild.getBoundingClientRect().right;
            setDistToRightBorder(distanceToRight);
        }
    }, []);



    return (
        // <nav className={classNames(cls.Navbar, mods, [className])} style={style}>
        <nav className={classNames(cls.Navbar, mods, [className])} style={style}>

            <div className={cls.NestedContainer}>

                <div className={cls.navMenu}>
                    <div className={cls.leftSide}>
                        <NavbarItems
                            key={"isLeftSide"}
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
                            key={"isCenter"}
                            itemNavbarDropDownClassname={itemNavbarDropDownClassname}
                            items={navbarMenu}
                            positionChecker={isCenter}
                            itemLinkClassname={itemLinkClassname}
                            itemLogoClassname={itemLogoClassname}
                            itemFakeLinkClassname={itemFakeLinkClassname}
                        />
                    </div>
                    <div className={cls.rightSide} ref={rightSideRef}>

                        <NavbarItems
                            key={"isRightSide"}
                            itemNavbarDropDownClassname={itemNavbarDropDownClassname}
                            items={navbarMenu}
                            positionChecker={isRightSide}
                            itemLinkClassname={itemLinkClassname}
                            itemLogoClassname={itemLogoClassname}
                            itemFakeLinkClassname={itemFakeLinkClassname}
                        />

                    </div>


                    <div
                        className={cls.rightSideAuth}
                        style={{marginRight: distToRightBorder}}
                    >
                        {
                            canI("canISeeLogin")
                                ? (
                                    <AppLink
                                        theme={AppLinkTheme.PRIMARY}
                                        to={navbarMenuLoginProfile.login.path}
                                        key={navbarMenuLoginProfile.login.path}
                                    >
                                        <span>{t(`${navbarMenuLoginProfile.login.name}`)}</span>
                                    </AppLink>
                                )
                                : canI("canISeeLogout")
                                    ? <div onClick={() => logout()}>
                                        {t(`logout`)}
                                    </div>
                                    : null
                        }
                    </div>


                </div>
            </div>
        </nav>
    );


};


NavbarDesktop.displayName = 'NavbarDesktop';
export default memo(NavbarDesktop);


interface NavbarItemsProps {
    items: NavbarMenu;
    positionChecker: PositionChecker;
    itemLinkClassname: string;
    itemLogoClassname: string;
    itemFakeLinkClassname: string;
    itemNavbarDropDownClassname: string
}

const NavbarItemsComponent =
    ({
         items,
         positionChecker,
         itemLinkClassname,
         itemLogoClassname,
         itemFakeLinkClassname,
         itemNavbarDropDownClassname,
     }: NavbarItemsProps) => {


        const params = useParams();
        const lng = params.lng as string;
        const {t} = useClientTranslation(lng, "navbar");

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
                                    <span>{t(`${item.name}`)}</span>
                                </AppLink>
                            );
                        }

                        if (isNavbarDropDownObject(item)) {

                            const localizedElements = item.elements.map((element) => ({
                                ...element,
                                elementText: t(`${element.elementText}`),
                            }));

                            return (
                                <DropdownWrapper
                                    // isDisabled={{status: true, reason: "Kirjaudu ensin"}}
                                    elements={localizedElements}
                                    contentAbsolute={true}
                                    mouseOverLeaveMode={true}
                                    key={item.name}
                                    className={itemNavbarDropDownClassname}
                                    childrenWrapperClassName={cls.itemNavbarDropDownChildrenWrapper}
                                    contentClassName={cls.itemNavbarDropDownContentClassName}
                                >
                                    <div>{t(`${item.name}`)}</div>
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

                                    <Image
                                        loading={"eager"}
                                        src={navLogoMobile.src}
                                        alt={navLogoMobile.name}
                                        width={215}
                                        className={itemLogoClassname}
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
                                    {t(`${item.name}`)}
                                </div>
                            );
                        }



                        return null;
                    })}
            </>
        );
    };

NavbarItemsComponent.displayName = 'NavbarItems';

const NavbarItems = memo(NavbarItemsComponent);


