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

interface NavbarMainProps {
    marginTop?: number;
    className?: string;
    navBarType?: NavBarType;
}

export const NavbarMain = memo((props: NavbarMainProps) => {
    const { marginTop, className, navBarType = 'Default' } = props;

    const { isMobileSize, isTabletSize } = useSizes();
    const size = useMemo(
        () => (isMobileSize || isTabletSize ? 'mobile' : 'desktop'),
        [isMobileSize, isTabletSize],
    );
    const navbarBuild = useMemo(
        () => getNavbarBuildByTypeAndSize(navBarType, size),
        [navBarType, size],
    );
    if (!navBarType) return null;

    return (
        <FixedProvider>
            <CollapsedProvider>
                {isMobileSize || isTabletSize ? (
                    <NavbarMobile
                        marginTop={marginTop}
                        className={className}
                        navbarBuild={navbarBuild}
                        navBarType={navBarType}
                    />
                ) : (
                    <NavbarDesktop
                        marginTop={marginTop}
                        className={className}
                        navbarBuild={navbarBuild}
                        navBarType={navBarType}
                    />
                )}
            </CollapsedProvider>
        </FixedProvider>
    );
});

NavbarMain.displayName = 'NavbarMain';
