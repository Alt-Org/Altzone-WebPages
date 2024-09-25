import { NavbarBuild, NavbarMenuItem } from "../../model/types";
import { memo } from "react";
import { useParams } from "next/navigation";
import { useClientTranslation } from "@/shared/i18n";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./NavbarDesktopV2.module.scss";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import { DropdownWrapper } from "@/shared/ui/DropdownWrapper";
import Image from "next/image";
import { useUserPermissions } from "@/entities/Auth";

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
    const { canI } = useUserPermissions();

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

        const localizedElements = item.elements
            .map((element) => {
                if (element.elementText == "clanpage" && !canI("canISeeOwnClan")) {
                    return null; // Skip this element if elementText is "clanpage"
                }
                return {
                    ...element,
                    elementText: t(`${element.elementText}`), // Localize elementText for other elements
                };
            })
            .filter(element => element !== null); // Filter out the null elements



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

NavItem.displayName = "NavItem";

export default NavItem;