import { CSSProperties } from "react";
import cls from "./NavbarDesktopV2.module.scss";
import { NavbarBuild, NavBarType } from "../../model/types";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import { useParams } from "next/navigation";
import { useClientTranslation } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";
import { LangSwitcher } from "@/features/LangSwitcher";
import { useLogoutMutation, useUserPermissions } from "@/entities/Auth";
import NavItem from "./NavItem";
import useIsPageScrollbar from "@/shared/lib/hooks/useIsPageScrollbar";
import { FixedButton } from "../FixedButton/FixedButton";
import { useFixed } from "../../model/FixedProvider";
import { defineNs } from "../../model/defineNs";



type NavbarProps = {
    overlaid?: boolean;
    marginTop?: number;
    className?: string;
    navbarBuild: NavbarBuild
    isFixed?: boolean;
    navBarType?: NavBarType;
}

const NavbarDesktopV2 = (props: NavbarProps) => {

    const {
        navbarBuild,
        overlaid = false,
        marginTop,
        className = '',
        navBarType = "Default"
    } = props;

    const { isFixed } = useFixed();
    const hasScrollbar = useIsPageScrollbar();

    const { canI } = useUserPermissions();
    const [logout] = useLogoutMutation();
    const params = useParams();
    const lng = params.lng as string;


    const ns = defineNs(navBarType)

    const { t, i18n } = useClientTranslation(lng, ns);


    const style = marginTop
        ? ({ "marginTop": `${marginTop}px` } as CSSProperties)
        : {};

    const mods: Record<string, boolean> = {
        [cls.overlayed]: overlaid && !isFixed,
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
                            canI("canISeeLogin")
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
                                : canI("canISeeLogout")
                                    ? <div onClick={() => logout()}>
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
};

export default NavbarDesktopV2;

NavbarDesktopV2.displayName = "NavbarDesktopV2"

