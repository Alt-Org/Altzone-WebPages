/**
 * The function `getNavbarBuildByTypeAndSize` returns the appropriate navbar menu based on the type and
 * size specified.
 * @param {NavBarType} type - The `type` parameter in the `getNavbarBuildByTypeAndSize` function
 * represents the type of navigation bar you want to retrieve. It can have the following values:
 * 'Default', 'Clan', 'GameArt', 'Cookies', or 'Privacy'.
 * @param {'mobile' | 'tablet' | 'desktop'} size - The `size` parameter in the
 * `getNavbarBuildByTypeAndSize` function can have three possible values: 'mobile', 'tablet', or
 * 'desktop'. This parameter is used to determine which set of navigation bar items to return based on
 * the specified type and size.
 * @returns The `getNavbarBuildByTypeAndSize` function returns the appropriate navbar menu based on the
 * provided `type` and `size` parameters. If the `size` is 'desktop', it returns the corresponding
 * desktop menu based on the `type`. If the `size` is 'mobile' or 'tablet', it returns the
 * corresponding mobile menu based on the `type`. If the `type`
 */
import { NavBarType } from './types';
import {
  navbarGameArtMobile,
  navbarMenuMobile,
  navbarCookiesMobile,
  navbarPrivacyMobile,
} from './data/navbarMenuMobile';
import {
  navbarGameArtDesktop,
  navbarMenuDesktop3,
  navbarCookiesDesktop,
  navbarPrivacyDesktop,
} from './data/navbarMenuDesktop';

export const getNavbarBuildByTypeAndSize = (
  type: NavBarType,
  size: 'mobile' | 'tablet' | 'desktop',
) => {
  if (size === 'desktop') {
    switch (type) {
      case 'Default':
        return navbarMenuDesktop3;
      case 'GameArt':
        return navbarGameArtDesktop;
      case 'Cookies':
        return navbarCookiesDesktop;
      case 'Privacy':
        return navbarPrivacyDesktop;
      default:
        return navbarMenuDesktop3;
    }
  } else {
    switch (type) {
      case 'Default':
        return navbarMenuMobile;
      case 'GameArt':
        return navbarGameArtMobile;
      case 'Cookies':
        return navbarCookiesMobile;
      case 'Privacy':
        return navbarPrivacyMobile;
      default:
        return navbarMenuMobile;
    }
  }
};
