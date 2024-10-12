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

    // @ts-ignore let's just let it be
    type SelectedRoutePaths = keyof Pick<typeof RoutePaths, 'MAIN' | 'GAME_ART' | 'cookies' | 'privacy' | 'auth'>;

    const navbarConfig: { [key in SelectedRoutePaths]: NavBarTypeWithNone } = {
        MAIN: 'None',
        GAME_ART: 'GameArt',
        cookies: 'Cookies',
        privacy: 'Privacy',
        auth: 'None',
    };

    const navBarType = (navbarConfig[pathAfterLang as SelectedRoutePaths] || 'Default');

    const shouldShowNavbar = navBarType !== 'None';

    return { navBarType, shouldShowNavbar };
}