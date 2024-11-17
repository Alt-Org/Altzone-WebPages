'use client';
import { memo, useMemo } from 'react';
import useSizes from '@/shared/lib/hooks/useSizes';
import { getNavbarBuildBySize } from '../../model/getNavbarBuildByTypeAndSize';
import NavbarDesktop from '../NavbarDesktop/NavbarDesktop';
import NavbarMobile from '../NavbarMobile/NavbarMobile';
import { useDispatch, useSelector } from 'react-redux';
import {
    navBarActions,
    selectIsCollapsed,
    selectIsFixed,
} from '../../model/navbarSlice/navBarSlice';

interface NavbarMainProps {
    marginTop?: number;
    className?: string;
}

export const NavbarMain = memo((props: NavbarMainProps) => {
    const { marginTop, className } = props;

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

    const navbarBuild = useMemo(() => getNavbarBuildBySize(size), [size]);

    return isTouchSize ? (
        <NavbarMobile
            marginTop={marginTop}
            className={className}
            navbarBuild={navbarBuild}
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
            isFixed={isFixed}
            isCollapsed={isCollapsed}
            toggleCollapsed={handleToggleCollapsed}
            toggleFixed={handleToggleFixed}
        />
    );
});

NavbarMain.displayName = 'NavbarMain';
