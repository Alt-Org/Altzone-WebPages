import {CSSProperties, memo, useEffect, useState} from "react";
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import cls from "./NavbarDesktopV3.module.scss";
import navLogo from "@/shared/assets/images/altLogo.png";
import { NavbarBuild, NavBarType, ItemType } from "../../model/types";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useClientTranslation } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";
import { LangSwitcher } from "@/features/LangSwitcher";
import {useLogoutMutation,useUserPermissionsV2} from "@/entities/Auth";
import NavItem from "./NavItem";
import useIsPageScrollbar from "@/shared/lib/hooks/useIsPageScrollbar";
import { FixedButton, CollapsedButton } from "../Button/Button";
import { useFixedAndCollapsed } from "../../model/FixedAndCollapsedProvider";
import { defineNs } from "../../model/defineNs";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import Image from "next/image";
import $ from 'jquery'


type NavbarProps = {
    marginTop?: number;
    className?: string;
    navbarBuild: NavbarBuild
    isFixed?: boolean;
    navBarType?: NavBarType;
}

const NavbarDesktopV3 = memo((props: NavbarProps) => {
    const {
        navbarBuild,
        marginTop,
        className = '',
        navBarType = "Default"
    } = props;
    
    const { isFixed, isCollapsed } = useFixedAndCollapsed();
    const [showItem, setShowItem] = useState(!isCollapsed)
   
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

    const checkNavbarWidth = () => {
        if(window.innerWidth > 1400) return 1400
        else return window.innerWidth
    }
     if($('#nav')){    
        if(!isCollapsed)
            $('#nav').css('width', checkNavbarWidth()+'px')
     }

     useEffect(() => {
        if(!(!isCollapsed && showItem)){ 
            setShowItem(false)
            $('#nav').css('transition','padding-left 1s,width 1s')
        }

        if(isCollapsed) {
            $('#nav').css('width',(Number($('#item').outerWidth())+5)+'px')
        } else {    
            $('#nav').css('width',checkNavbarWidth()+'px')
        }
        
        setTimeout(() => {
            $('#nav').css('transition','width 0s')
            if(!isCollapsed) {
                setShowItem(true)
            }
          }, 1000);
          
     }, [isCollapsed])
     
    const mods: Record<string, boolean> = {
        [cls.fixed]: isFixed,
        [cls.collapsed]: isCollapsed
    } as Record<string, boolean>;

    return (
        <nav className={classNames(cls.siteNav, mods, [className])} style={style}>

            <Container>
           
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={RoutePaths.MAIN}
                    className={classNames(cls.appLinkLogoStatic, {}, [])}
                >
                    <Image
                        loading={"eager"}
                        alt='Nav logo'
                        src={navLogo}
                        width={120}
                        className={cls.itemLogoImgStatic}
                    />
                </AppLink>
                
                <ul id='nav' className={classNames(cls.siteNavContentList, mods)}>
                   
                    {showItem &&
                        navbarBuild.menu.map(n => {
                            return <NavItem item={n} key={n.name} navbarBuild={navbarBuild} />;
                        })
                    }
                    
                    {showItem &&
                    <li className={cls.navItem} key={"switcher key"}>
                        <LangSwitcher className={cls.langSwitcher} />
                    </li>
                    }
                     {showItem &&
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
                    }
                    {hasScrollbar && !isCollapsed && showItem && (
                        <li className={cls.toggleOverlaid}>
                            <FixedButton/>
                        </li>
                    )}
                
                    {isFixed && (
                        isCollapsed ?
                        <li id='item' className={cls.collapseButtonCollapsed}>
                            <CollapsedButton />
                        </li>
                        :
                        <li className={cls.collapseButtonExpanded}>
                            <CollapsedButton />
                        </li>
                    )}
                </ul>
            </Container>
        </nav>
    );
});

export default NavbarDesktopV3;

NavbarDesktopV3.displayName = "NavbarDesktopV3"

