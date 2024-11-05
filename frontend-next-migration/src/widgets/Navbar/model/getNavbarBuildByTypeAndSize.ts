import {
    navbarGameArtDesktop,
    navbarMenuDesktop,
    navbarCookiesDesktop,
    navbarPrivacyDesktop,
} from './data/navbarMenuDesktop';
import {
    navbarGameArtMobile,
    navbarMenuMobile,
    navbarCookiesMobile,
    navbarPrivacyMobile,
} from './data/navbarMenuMobile';
import { NavBarType } from './types';

export const getNavbarBuildByTypeAndSize = (
    type: NavBarType,
    size: 'mobile' | 'tablet' | 'desktop',
) => {
    if (size === 'desktop') {
        switch (type) {
            case 'Default':
                return navbarMenuDesktop;
            case 'GameArt':
                return navbarGameArtDesktop;
            case 'Cookies':
                return navbarCookiesDesktop;
            case 'Privacy':
                return navbarPrivacyDesktop;
            default:
                return navbarMenuDesktop;
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
