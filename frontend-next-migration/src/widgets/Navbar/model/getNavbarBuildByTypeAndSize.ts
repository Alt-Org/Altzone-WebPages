import { NavBarType } from './types';
import {
  navbarClanMobile,
  navbarGameArtMobile,
  navbarMenuMobile,
  navbarTeachingMobile,
  navbarCookiesMobile,
  navbarPrivacyMobile,
} from './data/navbarMenuMobile';
import {
  navbarClanDesktop,
  navbarGameArtDesktop,
  navbarMenuDesktop2,
  navbarTeachingDesktop,
  navbarCookiesDesktop,
  navbarPrivacyDesktop,
} from './data/navbarMenuDesktop';

export const getNavbarBuildByTypeAndSize = (
  type: NavBarType,
  isMobileSize: boolean,
) => {
  if (isMobileSize) {
    switch (type) {
      case 'Default':
        return navbarMenuMobile;
      case 'Clan':
        return navbarClanMobile;
      case 'TeachingPackage':
        return navbarTeachingMobile;
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
      case 'TeachingPackage':
        return navbarTeachingDesktop;
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
