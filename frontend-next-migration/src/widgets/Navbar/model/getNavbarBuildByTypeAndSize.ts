import { navbarMenuDesktop } from './data/navbarMenuDesktop';
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
                return navbarMenuDesktop;
            case 'Cookies':
                return navbarMenuDesktop;
            case 'Privacy':
                return navbarMenuDesktop;
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
