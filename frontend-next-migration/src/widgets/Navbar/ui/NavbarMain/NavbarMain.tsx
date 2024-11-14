'use client';
import { memo, useMemo } from 'react';
import useSizes from '@/shared/lib/hooks/useSizes';
import { CollapsedProvider } from '../../model/CollapsedProvider';
import { FixedProvider } from '../../model/FixedProvider';
import { getNavbarBuildByTypeAndSize } from '../../model/getNavbarBuildByTypeAndSize';
import { NavBarType } from '../../model/types';
import NavbarDesktop from '../NavbarDesktop/NavbarDesktop';
import NavbarMobile from '../NavbarMobile/NavbarMobile';
import NavbarMobileV2 from '../../~deprecated/ui/NavbarMobileV2/NavbarMobileV2';
import { useDispatch, useSelector } from 'react-redux';
import {
    navBarActions,
    selectIsCollapsed,
    selectIsFixed,
} from '../../model/navbarSlice/navBarSlice';

interface NavbarMainProps {
    marginTop?: number;
    className?: string;
    navBarType?: NavBarType;
}

export const NavbarMain = memo((props: NavbarMainProps) => {
    const { marginTop, className, navBarType = 'Default' } = props;

    const isFixed = useSelector(selectIsFixed);
    const isCollapsed = useSelector(selectIsCollapsed);

    const dispatch = useDispatch();

    const handleToggleFixed = () => {
        dispatch(navBarActions.toggleFixed());
    };

    const handleToggleCollapsed = () => {
        dispatch(navBarActions.toggleCollapsed());
    };

    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchSize = isMobileSize || isTabletSize;

    const size = useMemo(() => (isTouchSize ? 'mobile' : 'desktop'), [isTouchSize]);
    const navbarBuild = useMemo(
        () => getNavbarBuildByTypeAndSize(navBarType, size),
        [navBarType, size],
    );
    if (!navBarType) return null;

    return isTouchSize ? (
        <NavbarMobile
            marginTop={marginTop}
            className={className}
            navbarBuild={navbarBuild}
            navBarType={navBarType}
            isFixed={isFixed}
            isCollapsed={isCollapsed}
            toggleCollapsed={handleToggleFixed}
            toggleFixed={handleToggleFixed}
        />
    ) : (
        <NavbarDesktop
            marginTop={marginTop}
            className={className}
            navbarBuild={navbarBuild}
            navBarType={navBarType}
            isFixed={isFixed}
            isCollapsed={isCollapsed}
            toggleCollapsed={handleToggleCollapsed}
            toggleFixed={handleToggleFixed}
        />
    );
});

NavbarMain.displayName = 'NavbarMain';
