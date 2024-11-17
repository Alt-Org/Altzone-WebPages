import { navbarMenuDesktop } from './data/navbarMenuDesktop';
import { navbarMenuMobile } from './data/navbarMenuMobile';

export const getNavbarBuildBySize = (size: 'mobile' | 'tablet' | 'desktop') => {
    if (size === 'desktop') {
        return navbarMenuDesktop;
    }
    return navbarMenuMobile;
};
