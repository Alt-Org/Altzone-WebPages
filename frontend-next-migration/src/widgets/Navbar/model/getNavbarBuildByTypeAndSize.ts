import { NavBarType } from './types';
import {
  navbarClanMobile,
  navbarGameArtMobile,
  navbarMenuMobile,
  navbarCookiesMobile,
  navbarPrivacyMobile,
} from './data/navbarMenuMobile';
import {
  navbarClanDesktop,
  navbarGameArtDesktop,
  navbarMenuDesktop2,
  navbarCookiesDesktop,
  navbarPrivacyDesktop,
} from './data/navbarMenuDesktop';

export const getNavbarBuildByTypeAndSize = (
  type: NavBarType,
  isMobileSize: boolean,
  isTabletSize: boolean,
) => {
  if (isMobileSize || isTabletSize) {
    switch (type) {
      case 'Default':
        return navbarMenuMobile;
      case 'Clan':
        return navbarClanMobile;
      case 'GameArt':
        return navbarGameArtMobile;
      case 'Cookies':
        return navbarCookiesMobile;
      case 'Privacy':
        return navbarPrivacyMobile;
      default:
        return navbarMenuMobile;
    }
  } else {
    switch (type) {
      case 'Default':
        return navbarMenuDesktop2;
      case 'Clan':
        return navbarClanDesktop;
      case 'GameArt':
        return navbarGameArtDesktop;
      case 'Cookies':
        return navbarCookiesDesktop;
      case 'Privacy':
        return navbarPrivacyDesktop;
      default:
        return navbarMenuDesktop2;
    }
  }
};
