import { usePathname } from 'next/navigation';
import { CSSProperties, memo, useEffect, useState } from 'react';
import { LangSwitcher } from '@/features/LangSwitcher';
import { useLogoutMutation, useUserPermissionsV2 } from '@/entities/Auth';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { useClientTranslation } from '@/shared/i18n';
import { Container } from '@/shared/ui/Container';
import useIsPageScrollbar from '@/shared/lib/hooks/useIsPageScrollbar';
import { NavbarBuild } from '../../model/types';
import { ToggleCollapseButton } from '../ToggleCollapseButton/ToggleCollapseButton';
import { ToggleFixButton } from '../ToggleFixButton/ToggleFixButton';
import cls from './NavbarDesktop.module.scss';
import NavItem from './NavItem';

/**
 * Properties for NavnarDesctop component
 *
 * @property {number} marginTop Margin at the top
 * @property {string} className Additional CSS classes
 * @property {NavbarBuild} navbarBuild Navigation bar components according to usage type and view size
 * @property {boolean} isFixed This is deprecated. Fixed type is get from context
 */
export interface NavbarProps {
    marginTop?: number;
    className?: string;
    navbarBuild: NavbarBuild;
    isFixed: boolean;
    isCollapsed: boolean;
    toggleCollapsed: () => void;
    toggleFixed: () => void;
}

const NavbarDesktop = memo((props: NavbarProps) => {
    const {
        navbarBuild,
        marginTop,
        className = '',
        toggleCollapsed,
        toggleFixed,
        isCollapsed,
        isFixed,
    } = props;

    const hasScrollbar = useIsPageScrollbar();

    const { checkPermissionFor } = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor('login');
    const permissionToLogout = checkPermissionFor('logout');
    // todo looks like it should be moved to the feature layer
    const [logout] = useLogoutMutation();

    const { t } = useClientTranslation('navbar');
    const [isAnimating, setIsAnimating] = useState(false);

    const style = marginTop ? ({ marginTop: `${marginTop}px` } as CSSProperties) : {};

    const mods: Record<string, boolean> = {
        [cls.fixed]: isFixed,
        [cls.collapsed]: isCollapsed,
        [cls.collapsing]: isAnimating,
    } as Record<string, boolean>;

    const ModsUlAndLi: Record<string, boolean> = {
        [cls.collapsed]: isCollapsed,
    } as Record<string, boolean>;

    const handleCollapseClick = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            toggleCollapsed?.();
            // dispatch(navBarActions.toggleCollapsed());
        }
    };

    const handleToggleFixed = () => {
        // dispatch(navBarActions.toggleFixed());
        toggleFixed?.();
    };

    const handleTransitionEnd = () => {
        setIsAnimating(false);
    };

    const [realPath, setRealPath] = useState('/');
    const pathname = usePathname();

    useEffect(() => {
        const pathSegments = pathname.split('/').filter(Boolean);
        const newPath = pathSegments.length === 1 ? '/' : `/${pathSegments[1] || ''}`;
        setRealPath(newPath);
    }, [pathname]);

    return (
        <nav
            className={classNames(cls.siteNav, mods, [className])}
            style={style}
            aria-label="Nav menu"
        >
            <Container>
                <ul className={classNames(cls.siteNavContentList, ModsUlAndLi)}>
                    {navbarBuild.menu.map((item) => (
                        <NavItem
                            currentPath={realPath}
                            item={item}
                            key={item.name}
                            className={classNames('', ModsUlAndLi)}
                        />
                    ))}

                    <li
                        className={classNames(cls.navItem, ModsUlAndLi)}
                        key={'switcher key'}
                    >
                        <LangSwitcher className={cls.langSwitcher} />
                    </li>

                    <li
                        className={classNames(cls.navItem, ModsUlAndLi, [cls.authButton])}
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
                            <p
                                className={cls.logoutButton}
                                onClick={() => logout()}
                            >
                                {t(`logout`)}
                            </p>
                        ) : null}
                    </li>

                    {hasScrollbar && (
                        <li
                            data-testid="toggleFixButtonWrapper"
                            onTransitionEnd={handleTransitionEnd}
                            className={classNames(
                                cls.FixButtonWrapper,
                                { ...ModsUlAndLi, [cls.fixed]: !isFixed },
                                [cls.navItem],
                            )}
                        >
                            <ToggleFixButton
                                onClick={handleToggleFixed}
                                isFixed={isFixed}
                                className={cls.FixButton}
                            />
                        </li>
                    )}
                    {isFixed && (
                        <li
                            data-testid="collapseExpandWrapper"
                            className={classNames(cls.CollapseButtonWrapper, {
                                [cls.collapsing]: isAnimating,
                            })}
                        >
                            <ToggleCollapseButton
                                onClick={handleCollapseClick}
                                isCollapsed={isCollapsed}
                                className={cls.CollapseButton}
                                disabled={isAnimating}
                            />
                        </li>
                    )}
                </ul>
            </Container>
        </nav>
    );
});

export default NavbarDesktop;

NavbarDesktop.displayName = 'NavbarDesktop';
