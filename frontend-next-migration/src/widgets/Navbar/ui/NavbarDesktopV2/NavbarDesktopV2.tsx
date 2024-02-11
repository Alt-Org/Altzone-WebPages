import React, {memo} from "react";
import cls from "./NavbarDesktopV2.module.scss";
import {NavbarBuild, NavbarMenuItem} from "../../model/types/types";
import {classNames} from "@/shared/lib/classNames/classNames";
import {AppLink, AppLinkTheme} from "@/shared/ui/AppLink/AppLink";
import {useParams} from "next/navigation";
import {useClientTranslation} from "@/shared/i18n";
import {DropdownWrapper} from "@/shared/ui/DropdownWrapper";
import Image from "next/image";
import { Container } from "@/shared/ui/Container";



type NavbarProps = {
    navbarBuild:  NavbarBuild

}

const NavbarDesktopV2 = (props: NavbarProps) => {

    const {navbarBuild}= props;


    return (
        <nav  className={cls.siteNav}>

            <Container>
                <ul className={cls.siteNavContentList}>

                    {
                        navbarBuild.menu.map(n=>(
                            <NavItem item={n} navbarBuild={navbarBuild} />
                        ))
                    }
                </ul>
            </Container>
        </nav>
    );
};

export default NavbarDesktopV2;




type NavItemProps = {
    item: NavbarMenuItem;
    className?: string;
    navbarBuild:  NavbarBuild
}

const NavItem = memo((props: NavItemProps)=> {
    const {item, className= '', navbarBuild} = props;
    const {type: itemType} = item

    const params = useParams();
    const lng = params.lng as string;
    const {t} = useClientTranslation(lng, "navbar");


    if(itemType === "navLink") {
        return (
            <li
                className=
                    {classNames(cls.navItem, {}, [className])} >
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={item.path}
                    key={item.path}
                >
                    <span>{t(`${item.name}`)}</span>
                </AppLink>

            </li>
        )
    }


    if(itemType === "navDropDown") {

        const localizedElements =  item.elements.map((element) => ({
            ...element,
            elementText: t(`${element.elementText}`),
        }));


        return (
            <li
                className=
                    {classNames(cls.navItem, {}, [className])} >

                <DropdownWrapper
                    elements={localizedElements}
                    contentAbsolute={true}
                    mouseOverLeaveMode={true}
                    key={item.name}
                    // className={cls.itemNavbarDropDownClassname}
                    // childrenWrapperClassName={cls.itemNavbarDropDownChildrenWrapper}
                    // contentClassName={cls.itemNavbarDropDownContentClassName}
                    contentClassName={cls.itemNavbarDropDownContent}
                >
                    <div>{t(`${item.name}`)}</div>
                </DropdownWrapper>
            </li>
        )
    }


    if (itemType === "navLogo") {
        return (
            <li>
            <AppLink
                theme={AppLinkTheme.PRIMARY}
                to={item.path}
                key={item.src}
                className={classNames(cls.appLink, {}, [cls.appLinkLogo])}
            >

                <Image
                    loading={"eager"}
                    alt={  navbarBuild?.namedMenu?.navLogo?.name || ''}
                    src={  navbarBuild?.namedMenu?.navLogo?.src || ''}
                    width={120}
                    className={cls.itemLogoImg}
                />
            </AppLink>
            </li>

        );
    }

})
