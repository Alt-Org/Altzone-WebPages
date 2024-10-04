'use client';
import { memo } from 'react';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import {
  navbarMenuDesktop2,
  navbarGameArtDesktop,
} from '../../model/data/navbarMenuDesktop';
import {
  navbarMenuMobile,
  navbarGameArtMobile,
} from '../../model/data/navbarMenuMobile';
import NavbarDesktopV2 from '../../ui/NavbarDesktopV2/NavbarDesktopV2';
import NavbarMobileV2 from '../../ui/NavbarMobileV2/NavbarMobileV2';
import { FixedProvider } from '@/widgets/Navbar/model/FixedProvider';

type NavBarType = 'Default' | 'Clan' | 'TeachingPackage' | '';

interface NavbarMainProps {
  marginTop?: number;
  className?: string;
  navBarType?: NavBarType;
}

/**
 * @deprecated
 NavbarMain renders the appropriate navbar component based on the screen size.
 For desktop, it loads NavbarDesktopMobile component that handles the logic
 to avoid showing loaders when resizing the screen.
 For touch devices, it loads NavbarMobileV2 or NavbarDesktop based on the screen size.
 @param {Object} props - The props object of the component.
 @param {boolean} props.overlayed - Determines whether the navbar should have an overlay effect or not.
 @param {number} props.marginTop - The margin top of the navbar.
 @returns {JSX.Element} - The appropriate navbar component.
 */
export const NavbarMainOld = memo((props: NavbarMainProps) => {
  const {marginTop, className } = props;

  const { isMobileSize } = useIsMobileSize();

  if (isMobileSize) {
    return (
      <FixedProvider>
        <NavbarMobileV2
          marginTop={marginTop}
          className={className}
          navbarBuild={navbarMenuMobile}
        />
      </FixedProvider>
    );
  }
  return (
    <>
      <FixedProvider>
        <NavbarDesktopV2
          navbarBuild={navbarMenuDesktop2}
          className={className}
          marginTop={marginTop}
        />
      </FixedProvider>
    </>
  );
});



//---------------------------------------------------------------------------//
/** @deprecated**/
export const NavbarGameArtMain = memo((props: NavbarMainProps) => {
  const {marginTop, className } = props;

  const { isMobileSize } = useIsMobileSize();

  if (isMobileSize) {
    return (
      <>
        <FixedProvider>
          <NavbarMobileV2
            marginTop={marginTop}
            className={className}
            navbarBuild={navbarGameArtMobile}
          />
        </FixedProvider>
      </>
    );
  }
  return (
    <>
      <FixedProvider>
        <NavbarDesktopV2
          navbarBuild={navbarGameArtDesktop}
          className={className}
          marginTop={marginTop}
        />
      </FixedProvider>
    </>
  );
});

NavbarMainOld.displayName = 'NavbarMainOld';
NavbarGameArtMain.displayName = 'NavbarGameArtMain';
