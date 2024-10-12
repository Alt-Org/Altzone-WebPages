'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar, NavBarType } from '@/widgets/Navbar';
import {RoutePaths} from "@/shared/appLinks/RoutePaths";

interface Props {
    children: ReactNode;
}

type NavBarTypeWithNone = NavBarType | 'None';


export default function Template(props: Props) {
    const { children } = props;

    const { navBarType, shouldShowNavbar } = useNavbarConfig();

    console.log(navBarType);

    return (
        <>
            {shouldShowNavbar && <Navbar navBarType={navBarType as NavBarType} />}
            {children}
        </>
    );
}


function useNavbarConfig() {
    const pathname = usePathname();

    const segments = pathname.split('/').slice(2);
    const pathAfterLang = segments.length > 0 ? `/${segments.join('/')}` : '/';
    type RoutePathKeys = keyof typeof RoutePaths;

    const navbarConfig: { [key in RoutePathKeys]?: NavBarTypeWithNone } = {
        [RoutePaths.MAIN]: 'None',
        [RoutePaths.GAME_ART]: 'GameArt',
        [RoutePaths.cookies]: 'Cookies',
        [RoutePaths.privacy]: 'Privacy',
    };

    const navBarType = (navbarConfig[pathAfterLang as RoutePathKeys] || 'Default');

    const shouldShowNavbar = navBarType !== 'None';

    return { navBarType, shouldShowNavbar };
}