'use client';
/* This code snippet is defining a React functional component called `NavbarMain`. It imports necessary
dependencies such as `memo` from React, and components like `NavbarDesktopV2` and `NavbarMobileV2`.
It also imports some types and functions related to the navbar. */

import {memo, useEffect, useMemo} from 'react';
import NavbarDesktopV3 from '../NavbarDesktopV3/NavbarDesktopV3';
import NavbarMobileV3 from '../NavbarMobileV3/NavbarMobileV3';
import { FixedAndCollapsedProvider } from '@/widgets/Navbar/model/FixedAndCollapsedProvider';
import { NavBarType } from '../../model/types';
import { getNavbarBuildByTypeAndSize } from '../../model/getNavbarBuildByTypeAndSize';
import useSizes from '@/shared/lib/hooks/useSizes';

interface NavbarMainProps {
  marginTop?: number;
  className?: string;
  navBarType?: NavBarType;
}

/**
 * Version 2 uses new versions of the navbar components.
 * The `Provider` component has been updated to manage the collapse state.
 */

export const NavbarMainV2 = memo((props: NavbarMainProps) => {

  const {
    marginTop,
    className,
    navBarType = 'Default'
  } = props;

  const { isMobileSize, isTabletSize } = useSizes();
  const size = useMemo(() => (isMobileSize || isTabletSize ? 'mobile' : 'desktop'), [isMobileSize, isTabletSize]);
  const navbarBuild = useMemo(() => getNavbarBuildByTypeAndSize(navBarType, size), [navBarType, size]);
  if(!navBarType) return null;

  return (
      <FixedAndCollapsedProvider>
        {isMobileSize || isTabletSize ? (
          <NavbarMobileV3
            marginTop={marginTop}
            className={className}
            navbarBuild={navbarBuild}
            navBarType={navBarType}
          />
        ) : (
          <NavbarDesktopV3
            marginTop={marginTop}
            className={className}
            navbarBuild={navbarBuild}
            navBarType={navBarType}
          />
        )}
      </FixedAndCollapsedProvider>
  );
});

NavbarMainV2.displayName = 'NavbarMainV2';


