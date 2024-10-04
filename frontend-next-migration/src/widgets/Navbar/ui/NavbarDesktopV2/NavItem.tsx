import { NavbarBuild, NavbarMenuItem } from "../../model/types";
import { memo } from "react";
import { useClientTranslation } from "@/shared/i18n";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./NavbarDesktopV2.module.scss";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import {DropDownElement, DropdownWrapper} from "@/shared/ui/DropdownWrapper";
import Image from "next/image";
import { useUserPermissionsV2 } from "@/entities/Auth";

type NavItemProps = {
    item: NavbarMenuItem;
    className?: string;
    navbarBuild: NavbarBuild
}

const NavItem = memo((props: NavItemProps) => {
    const { item, className = '', navbarBuild } = props;
    const { type: itemType } = item

    const { t } = useClientTranslation("navbar");
    const { checkPermissionFor } = useUserPermissionsV2();

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
        const canUserSeeOwnClan = checkPermissionFor("clan:seeOwn").isGranted;
        const localizedElements = item.elements
            .map((element) => {
                if(element.elementText == "clanpage" && !canUserSeeOwnClan) {
                    return null;
                }
                return {
                    ...element,
                    elementText: t(`${element.elementText}`),
                };
            })
            .filter(element => element !== null);
        return (
            <li key={item.name} className={classNames(cls.navItem, {}, [className])}>
                <DropdownWrapper
                    elements={localizedElements}
                    contentAbsolute={true}
                    mouseOverLeaveMode={true}
                    contentClassName={cls.itemNavbarDropDownContent}
                >
                    <div>{t(`${item.name}`)}</div>
                </DropdownWrapper>
            </li>
        );
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

NavItem.displayName = "NavItem";

export default NavItem;