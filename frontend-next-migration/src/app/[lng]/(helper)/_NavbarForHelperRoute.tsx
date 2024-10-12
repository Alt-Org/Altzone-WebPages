'use client'
import {usePathname} from "next/navigation";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {Navbar, NavBarType} from "@/widgets/Navbar";

export const _NavbarForHelperRoute = () => {
    const { navBarType, shouldShowNavbar } = useNavbarConfig();
    if(!shouldShowNavbar) return null;
    return (
        <Navbar navBarType={navBarType}/>
    )
}

function useNavbarConfig() {
    const pathname = usePathname();

    const segments = pathname.split('/').slice(2);
    const pathAfterLang = segments.length > 0 ? `/${segments.join('/')}` : '/';
    type RoutePathKeys = keyof typeof RoutePaths;

    const navbarConfig: { [key in RoutePathKeys]?: NavBarType } = {
        [RoutePaths.MAIN]: 'None',
        [RoutePaths.GAME_ART]: 'GameArt',
        [RoutePaths.cookies]: 'Cookies',
        [RoutePaths.privacy]: 'Privacy',
    };
    const navBarType = (navbarConfig[pathAfterLang as RoutePathKeys] || 'Default');
    const shouldShowNavbar = navBarType !== 'None';
    return { navBarType, shouldShowNavbar };
}