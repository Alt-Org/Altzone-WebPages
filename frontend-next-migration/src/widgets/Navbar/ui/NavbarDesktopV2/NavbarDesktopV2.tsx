import { CSSProperties, memo } from 'react';
import { LangSwitcher } from '@/features/LangSwitcher';
import { useLogoutMutation, useUserPermissionsV2 } from '@/entities/Auth';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { useClientTranslation } from '@/shared/i18n';
import { Container } from '@/shared/ui/Container';
import useIsPageScrollbar from '@/shared/lib/hooks/useIsPageScrollbar';
import { defineNs } from '../../model/defineNs';
import { useFixed } from '../../model/FixedProvider';
import { NavbarBuild, NavBarType } from '../../model/types';
import { ToggleFixButton } from '@/widgets/Navbar/ui/ToggleFixButton/ToggleFixButton';
import cls from './NavbarDesktopV2.module.scss';
import NavItem from './NavItem';
import { useCollapsed } from '../../model/CollapsedProvider';
import { ToggleCollapseButton } from '../ToggleCollapseButton/ToggleCollapseButton';

type NavbarProps = {
    marginTop?: number;
    className?: string;
    navbarBuild: NavbarBuild;
    isFixed?: boolean;
    navBarType?: NavBarType;
};

const NavbarDesktopV2 = memo((props: NavbarProps) => {
    const { navbarBuild, marginTop, className = '', navBarType = 'Default' } = props;

    const { isFixed } = useFixed();
    const { isCollapsed } = useCollapsed();

    const hasScrollbar = useIsPageScrollbar();

    const { checkPermissionFor } = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor('login');
    const permissionToLogout = checkPermissionFor('logout');
    // todo looks like it should be moved to the feature layer
    const [logout] = useLogoutMutation();

    const ns = defineNs(navBarType);
    const { t } = useClientTranslation(ns);

    const style = marginTop ? ({ marginTop: `${marginTop}px` } as CSSProperties) : {};

    const mods: Record<string, boolean> = {
        [cls.fixed]: isFixed,
        [cls.collapsed]: isCollapsed,
    } as Record<string, boolean>;

    return (
        <nav
            className={classNames(cls.siteNav, mods, [className])}
            style={style}
            aria-label="Nav menu"
        >
            <Container>
                <ul
                    className={classNames(cls.siteNavContentList, { [cls.collapsed]: isCollapsed })}
                >
                    <div
                        className={classNames(cls.siteNavContentListCollapsingPart, {
                            [cls.collapsed]: isCollapsed,
                        })}
                    >
                        {navbarBuild.menu.map((item) => (
                            <NavItem
                                item={item}
                                key={item.name}
                                navbarBuild={navbarBuild}
                            />
                        ))}

                        <li
                            className={cls.navItem}
                            key={'switcher key'}
                        >
                            <LangSwitcher className={cls.langSwitcher} />
                        </li>

                        <li
                            className={cls.navItem + ' ' + cls.authButton}
                            key={'auth key'}
                        >
                            {permissionToLogin.isGranted ? (
                                <AppLink
                                    theme={AppLinkTheme.PRIMARY}
                                    to={navbarBuild.namedMenu?.navAuthLogin?.path || ''}
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

                        {hasScrollbar && (
                            <li className={cls.FixButtonWrapper}>
                                <ToggleFixButton className={cls.FixButton} />
                            </li>
                        )}
                    </div>

                    {isFixed && (
                        <li className={cls.CollapseButtonWrapper}>
                            <ToggleCollapseButton className={cls.CollapseButton} />
                        </li>
                    )}
                </ul>
            </Container>
        </nav>
    );
});

export default NavbarDesktopV2;

NavbarDesktopV2.displayName = 'NavbarDesktopV2';
