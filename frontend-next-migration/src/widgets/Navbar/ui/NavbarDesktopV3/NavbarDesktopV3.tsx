import { CSSProperties, memo, useEffect, useState } from 'react';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import cls from './NavbarDesktopV3.module.scss';
import navLogo from '@/shared/assets/images/altLogo.png';
import { NavbarBuild, NavBarType } from '../../model/types';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useClientTranslation } from '@/shared/i18n';
import { Container } from '@/shared/ui/Container';
import { LangSwitcher } from '@/features/LangSwitcher';
import { useLogoutMutation, useUserPermissionsV2 } from '@/entities/Auth';
import NavItem from './NavItem';
import useIsPageScrollbar from '@/shared/lib/hooks/useIsPageScrollbar';
import { FixedButton, CollapsedButton } from '../Button/Button';
import { useFixedAndCollapsed } from '@/widgets/Navbar/model/FixedAndCollapsedProvider';
import { defineNs } from '../../model/defineNs';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import Image from 'next/image';

type NavbarProps = {
    marginTop?: number;
    className?: string;
    navbarBuild: NavbarBuild;
    isFixed?: boolean;
    navBarType?: NavBarType;
};

/**
 * Version 3 introduces the collapse/expand functionality.
 * The collapse state is passed through the context-provider `Provider` component in the same manner
 * as the fixed state in the pin/unpin feature.`useState` hooks manage CSS transitions in the new functionality.
 */

const NavbarDesktopV3 = memo((props: NavbarProps) => {
    const { navbarBuild, marginTop, navBarType = 'Default' } = props;

    const { isFixed, isCollapsed } = useFixedAndCollapsed();
    const [hidden, setHidden] = useState(isCollapsed ? cls.hidden : cls.visible);
    const [disabled, setDisabled] = useState(isCollapsed ? cls.disabled : '');
    const [appLinkLogo, setAppLinkLogo] = useState(isCollapsed ? cls.hidden : cls.visible);

    const hasScrollbar = useIsPageScrollbar();

    const { checkPermissionFor } = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor('login');
    const permissionToLogout = checkPermissionFor('logout');
    // todo looks like it should be moved to the feature layer
    const [logout] = useLogoutMutation();

    const ns = defineNs(navBarType);
    const { t } = useClientTranslation(ns);

    const style = marginTop ? ({ marginTop: `${marginTop}px` } as CSSProperties) : {};

    useEffect(() => {
        if (isCollapsed) {
            setHidden(cls.hidden);
            setAppLinkLogo(cls.hidden);
            setTimeout(() => {
                setDisabled(cls.disabled);
            }, 1000);
        } else {
            setDisabled('');
            setTimeout(() => {
                setAppLinkLogo(cls.visible);
            }, 1);
            setTimeout(() => {
                setHidden(cls.visible);
            }, 700);
        }
    }, [isCollapsed]);

    const mods: Record<string, boolean> = {
        [cls.fixed]: isFixed,
        [cls.collapsed]: isCollapsed,
    } as Record<string, boolean>;

    return (
        <nav
            className={classNames(cls.siteNav, mods, [])}
            style={style}
        >
            <Container>
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={RoutePaths.MAIN}
                    className={classNames(cls.appLinkLogoStatic, {}, [appLinkLogo, disabled])}
                >
                    <Image
                        loading={'eager'}
                        alt="Nav logo"
                        src={navLogo}
                        width={120}
                        className={cls.itemLogoImgStatic}
                    />
                </AppLink>

                <ul className={classNames(cls.siteNavContentList, mods)}>
                    {navbarBuild.menu.map((item) => {
                        return (
                            <NavItem
                                className={hidden + ' ' + disabled}
                                item={item}
                                key={item.name}
                                navbarBuild={navbarBuild}
                            />
                        );
                    })}

                    <li
                        className={hidden + ' ' + disabled}
                        key={'switcher key'}
                    >
                        <LangSwitcher className={cls.langSwitcher} />
                    </li>

                    <li
                        className={
                            cls.navItem + ' ' + cls.authButton + ' ' + hidden + ' ' + disabled
                        }
                        key={'auth key'}
                    >
                        {permissionToLogin.isGranted ? (
                            <AppLink
                                theme={AppLinkTheme.PRIMARY}
                                // to={navbarMenuLoginProfile?.login?.path || ''}
                                to={navbarBuild.namedMenu?.navAuthLogin?.path || ''}
                                // key={navbarMenuLoginProfile?.login?.path}
                            >
                                <span>{t(`${navbarBuild.namedMenu?.navAuthLogin?.name}`)}</span>
                            </AppLink>
                        ) : permissionToLogout.isGranted ? (
                            <div
                                className={cls.logoutButton}
                                onClick={() => logout()}
                            >
                                {t(`logout`)}
                            </div>
                        ) : null}
                    </li>

                    {hasScrollbar && !isCollapsed && (
                        <li className={cls.toggleOverlaid + ' ' + hidden + ' ' + disabled}>
                            <FixedButton />
                        </li>
                    )}

                    {isFixed &&
                        (isCollapsed ? (
                            <li className={cls.collapseButtonCollapsed}>
                                <CollapsedButton className={cls.visibilityButton} />
                            </li>
                        ) : (
                            <li className={cls.collapseButtonExpanded}>
                                <CollapsedButton className={cls.visibilityButton} />
                            </li>
                        ))}
                </ul>
            </Container>
        </nav>
    );
});

export default NavbarDesktopV3;

NavbarDesktopV3.displayName = 'NavbarDesktopV3';
