import {CSSProperties, memo} from "react";
import cls from "./NavbarDesktopV2.module.scss";
import { NavbarBuild, NavBarType } from "../../model/types";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import { useClientTranslation } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";
import { LangSwitcher } from "@/features/LangSwitcher";
import {useLogoutMutation,useUserPermissionsV2} from "@/entities/Auth";
import NavItem from "./NavItem";
import useIsPageScrollbar from "@/shared/lib/hooks/useIsPageScrollbar";
import { FixedButton } from "../FixedButton/FixedButton";
import { useFixed } from "../../model/FixedProvider";
import { defineNs } from "../../model/defineNs";


type NavbarProps = {
    marginTop?: number;
    className?: string;
    navbarBuild: NavbarBuild
    isFixed?: boolean;
    navBarType?: NavBarType;
}

const NavbarDesktopV2 = memo((props: NavbarProps) => {
    const {
        navbarBuild,
        marginTop,
        className = '',
        navBarType = "Default"
    } = props;

    const { isFixed } = useFixed();
    const hasScrollbar = useIsPageScrollbar();

    const {checkPermissionFor} = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor("login");
    const permissionToLogout = checkPermissionFor("logout");
    // todo looks like it should be moved to the feature layer
    const [logout] = useLogoutMutation();

    const ns = defineNs(navBarType);
    const { t } = useClientTranslation(ns);


    const style = marginTop
        ? ({ "marginTop": `${marginTop}px` } as CSSProperties)
        : {};

    const mods: Record<string, boolean> = {
        [cls.fixed]: isFixed,
    } as Record<string, boolean>;


    return (
        <nav className={classNames(cls.siteNav, mods, [className])} style={style}>

            <Container>
                <ul className={cls.siteNavContentList}>
                    {
                        navbarBuild.menu.map(n => {
                            return <NavItem item={n} key={n.name} navbarBuild={navbarBuild} />;
                        })
                    }


                    <li className={cls.navItem} key={"switcher key"}>
                        <LangSwitcher className={cls.langSwitcher} />
                    </li>


                    <li className={cls.navItem + ' ' + cls.authButton} key={"auth key"}>
                        {
                            permissionToLogin.isGranted
                                ? (
                                    <AppLink
                                        theme={AppLinkTheme.PRIMARY}
                                        // to={navbarMenuLoginProfile?.login?.path || ''}
                                        to={navbarBuild.namedMenu?.navAuthLogin?.path || ''}
                                    // key={navbarMenuLoginProfile?.login?.path}
                                    >
                                        <span>{t(`${navbarBuild.namedMenu?.navAuthLogin?.name}`)}</span>
                                    </AppLink>
                                )
                                :  permissionToLogout.isGranted
                                    ? <div className={cls.logoutButton} onClick={() => logout()}>
                                        {t(`logout`)}
                                    </div>
                                    : null
                        }
                    </li>

                    {hasScrollbar && (
                        <li className={cls.toggleOverlaid}>
                            <FixedButton />
                        </li>
                    )}

                </ul>


            </Container>
        </nav>
    );
});

export default NavbarDesktopV2;

NavbarDesktopV2.displayName = "NavbarDesktopV2"

