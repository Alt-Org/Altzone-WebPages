import {CSSProperties, memo, useLayoutEffect, useRef, useState} from "react";
import Image from 'next/image'
import {AppLink, AppLinkTheme} from "@/shared/ui/AppLink/AppLink";
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./NavbarDesktop.module.scss";
import {NavbarBuild, NavbarMenu, PositionChecker} from "../../../model/types";
import {
    isCenter,
    isLeftSide,
    isNavbarDropDownObject,
    isNavbarLinkFakeObject,
    isNavbarLinkObject,
    isNavLogoObject,
    isRightSide
} from "../../../model/types/type.guards";
import {DropdownWrapper} from "@/shared/ui/DropdownWrapper";
import {useLogoutMutation, useUserPermissionsV2} from "@/entities/Auth";
import {useClientTranslation} from "@/shared/i18n";
import {LangSwitcher} from "@/features/LangSwitcher";


interface NavbarProps {
    overlaid ?: boolean;
    marginTop?: number;
    className?: string;
    navbarBuild:  NavbarBuild

}

export const NavbarDesktop = ( props : NavbarProps) => {

    const {
        overlaid = false,
        marginTop,
        navbarBuild,
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

    const {checkPermissionFor} = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor("login");
    const permissionToLogout = checkPermissionFor("logout");


    // todo looks like it should be moved to the feature layer
    const [logout] = useLogoutMutation();

    const {t} = useClientTranslation("navbar");

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
        <nav className={classNames(cls.Navbar, mods, [className])} style={style}>

            <div className={cls.NestedContainer}>

                <div className={cls.navMenu}>
                    <div className={cls.leftSide}>
                        <NavbarItems
                            navbarBuild={navbarBuild}
                            key={"isLeftSide"}
                            items={navbarBuild.menu}
                            positionChecker={isLeftSide}
                            itemLinkClassname={itemLinkClassname}
                            itemLogoClassname={itemLogoClassname}
                            itemFakeLinkClassname={itemFakeLinkClassname}
                            itemNavbarDropDownClassname={itemNavbarDropDownClassname}
                        />
                    </div>
                    <div className={cls.center}>
                        <NavbarItems
                            navbarBuild={navbarBuild}
                            key={"isCenter"}
                            itemNavbarDropDownClassname={itemNavbarDropDownClassname}
                            items={navbarBuild.menu}
                            positionChecker={isCenter}
                            itemLinkClassname={itemLinkClassname}
                            itemLogoClassname={itemLogoClassname}
                            itemFakeLinkClassname={itemFakeLinkClassname}
                        />
                    </div>
                    <div className={cls.rightSide} ref={rightSideRef}>

                        <NavbarItems
                            navbarBuild={navbarBuild}
                            key={"isRightSide"}
                            itemNavbarDropDownClassname={itemNavbarDropDownClassname}
                            items={navbarBuild.menu}
                            positionChecker={isRightSide}
                            itemLinkClassname={itemLinkClassname}
                            itemLogoClassname={itemLogoClassname}
                            itemFakeLinkClassname={itemFakeLinkClassname}
                        />

                    </div>


                    <div
                        className={cls.rightSideUp}
                        style={{marginRight: distToRightBorder}}
                    >

                    <LangSwitcher className={cls.langSwitcher}/>
                    {/*<button onClick={()=> i18n.changeLanguage("fi") }>change language</button>*/}

                        {
                            permissionToLogin.isGranted
                                ? (
                                    <AppLink
                                        theme={AppLinkTheme.PRIMARY}
                                        // to={navbarMenuLoginProfile?.login?.path || ''}
                                        to={navbarBuild.namedMenu?.navAuthLogin?.path || ''}
                                        // key={navbarMenuLoginProfile?.login?.path}
                                    >
                                        <span>{t(`${navbarBuild.namedMenu?.navAuthLogin?.name }`)}</span>
                                    </AppLink>
                                )
                                : permissionToLogout.isGranted
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
    itemNavbarDropDownClassname: string;
    navbarBuild: NavbarBuild;
}

const NavbarItemsComponent =
    ({
         items,
         positionChecker,
         itemLinkClassname,
         itemLogoClassname,
         itemFakeLinkClassname,
         itemNavbarDropDownClassname,
         navbarBuild
     }: NavbarItemsProps) => {


        const {t} = useClientTranslation( "navbar");

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
                                        // src={navLogoMobile.src}
                                        src={navbarBuild?.namedMenu?.navLogo?.src || '' }
                                        alt={navbarBuild?.namedMenu?.navLogo?.name || ''}
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


