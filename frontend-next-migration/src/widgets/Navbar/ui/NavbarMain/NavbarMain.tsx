/* This code snippet is defining a React functional component called `NavbarMain`. It imports necessary
dependencies such as `memo` from React, and components like `NavbarDesktopV2` and `NavbarMobileV2`.
It also imports some types and functions related to the navbar. */
'use client';
import { memo } from 'react';
import NavbarDesktopV2 from '../NavbarDesktopV2/NavbarDesktopV2';
import NavbarMobileV2 from '../NavbarMobileV2/NavbarMobileV2';
import { FixedProvider } from '@/widgets/Navbar/model/FixedProvider';
import { NavBarType } from '../../model/types';
import { getNavbarBuildByTypeAndSize } from '../../model/getNavbarBuildByTypeAndSize';
import useSizes from '@/shared/lib/hooks/useSizes';

interface NavbarMainProps {
  overlaid?: boolean;
  marginTop?: number;
  className?: string;
  navBarType?: NavBarType;
}

export const NavbarMain = memo((props: NavbarMainProps) => {
  const { overlaid, marginTop, className, navBarType = 'Default' } = props;
  const { isMobileSize, isTabletSize } = useSizes();
  /* The line `const size = isMobileSize || isTabletSize ? 'mobile' : 'desktop';` is determining the
  size of the navbar based on the screen size. */
  const size = isMobileSize || isTabletSize ? 'mobile' : 'desktop';
  const navbarBuild = getNavbarBuildByTypeAndSize(navBarType, size);

  return (
    <FixedProvider>
      {isMobileSize || isTabletSize ? (
        <NavbarMobileV2
          overlaid={overlaid}
          marginTop={marginTop}
          className={className}
          navbarBuild={navbarBuild}
          navBarType={navBarType}
        />
      ) : (
        <NavbarDesktopV2
          overlaid={overlaid}
          marginTop={marginTop}
          className={className}
          navbarBuild={navbarBuild}
          navBarType={navBarType}
        />
      )}
    </FixedProvider>
  );
});

NavbarMain.displayName = 'NavbarMain';
