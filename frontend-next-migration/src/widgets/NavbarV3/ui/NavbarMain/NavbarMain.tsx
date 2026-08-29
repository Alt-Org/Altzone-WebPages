'use client';
import { memo, useMemo } from 'react';
import useSizes from '@/shared/lib/hooks/useSizes';
import { getNavbarBuildBySize } from '../../model/getNavbarBuildBySize';
import NavbarDesktop from '../NavbarDesktopV3/NavbarDesktop';
import NavbarMobile from '../NavbarMobileV3/NavbarMobile';

interface NavbarMainProps {
    marginTop?: number;
    className?: string;
}

export const NavbarMain = memo((props: NavbarMainProps) => {
    const { marginTop, className } = props;

    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchSize = isMobileSize || isTabletSize;

    const size = useMemo(() => (isTouchSize ? 'mobile' : 'desktop'), [isTouchSize]);

    const navbarBuild = useMemo(() => getNavbarBuildBySize(size), [size]);

    return isTouchSize ? (
        <NavbarMobile
            marginTop={marginTop}
            className={className}
            navbarBuild={navbarBuild}
        />
    ) : (
        <NavbarDesktop
            marginTop={marginTop}
            className={className}
            navbarBuild={navbarBuild}
        />
    );
});

NavbarMain.displayName = 'NavbarMain';
