import React, { CSSProperties, memo } from "react";
import cls from "./NavbarDesktopV2.module.scss";
import { NavbarBuild, NavbarMenuItem } from "../../model/types/types";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import { useParams } from "next/navigation";
import { useClientTranslation } from "@/shared/i18n";
import { DropdownWrapper } from "@/shared/ui/DropdownWrapper";
import Image from "next/image";
import { Container } from "@/shared/ui/Container";
import { LangSwitcher } from "@/features/LangSwitcher";
import { useLogoutMutation, useUserPermissions } from "@/entities/Auth";



type NavbarProps = {
    overlaid?: boolean;
    marginTop?: number;
    className?: string;
    navbarBuild: NavbarBuild

}

const NavbarDesktopV2 = (props: NavbarProps) => {

    const {
        navbarBuild,
        overlaid = false,
        marginTop,
        className = ''
    } = props;


    const { canI } = useUserPermissions();

    const [logout] = useLogoutMutation();

    const params = useParams();
    const lng = params.lng as string;
    const { t, i18n } = useClientTranslation(lng, "navbar");


    const style = marginTop
        ? ({ "marginTop": `${marginTop}px` } as CSSProperties)
        : {};

    const mods: Record<string, boolean> = {
        [cls.overlayed]: overlaid,
    } as Record<string, boolean>;

    return (
        <nav className={classNames(cls.siteNav, mods, [className])} style={style}>

            <Container>
                <ul className={cls.siteNavContentList}>

                    {
                        navbarBuild.menu.map(n => {
                            if (n.name === "my_clan" && !canI("canISeeOwnClan")) {
                                return null;
                            }
                            return <NavItem item={n} key={n.name} navbarBuild={navbarBuild} />;
                        })
                    }


                    <li className={cls.navItem} key={"switcher key"}>
                        <LangSwitcher className={cls.langSwitcher} />
                    </li>


                    <li className={cls.navItem + ' ' + cls.authButton} key={"auth key"}>
                        {
                            canI("canISeeLogin")
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
                                : canI("canISeeLogout")
                                    ? <div onClick={() => logout()}>
                                        {t(`logout`)}
                                    </div>
                                    : null
                        }
                    </li>



                </ul>


            </Container>
        </nav>
    );
};

export default NavbarDesktopV2;

NavbarDesktopV2.displayName = "NavbarDesktopV2"




type NavItemProps = {
    item: NavbarMenuItem;
    className?: string;
    navbarBuild: NavbarBuild
}

const NavItem = memo((props: NavItemProps) => {
    const { item, className = '', navbarBuild } = props;
    const { type: itemType } = item

    const params = useParams();
    const lng = params.lng as string;
    const { t } = useClientTranslation(lng, "navbar");


    if (itemType === "navLink") {
        return (
            <li
                key={item.path}
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


    if (itemType === "navDropDown") {

        const localizedElements = item.elements.map((element) => ({
            ...element,
            elementText: t(`${element.elementText}`),
        }));


        return (
            <li
                key={item.name}
                className=
                {classNames(cls.navItem, {}, [className])} >

                <DropdownWrapper
                    elements={localizedElements}
                    contentAbsolute={true}
                    mouseOverLeaveMode={true}
                    contentClassName={cls.itemNavbarDropDownContent}
                >
                    <div>{t(`${item.name}`)}</div>
                </DropdownWrapper>
            </li>
        )
    }


    if (itemType === "navLogo") {
        return (
            <li
                key={item.src}
            >
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={item.path}
                    className={classNames(cls.appLink, {}, [cls.appLinkLogo])}
                >

                    <Image
                        loading={"eager"}
                        alt={navbarBuild?.namedMenu?.navLogo?.name || ''}
                        src={navbarBuild?.namedMenu?.navLogo?.src || ''}
                        width={120}
                        className={cls.itemLogoImg}
                    />
                </AppLink>
            </li>

        );
    }

})

NavItem.displayName = "NavItem"
