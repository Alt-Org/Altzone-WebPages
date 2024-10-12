'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar, NavBarType } from '@/widgets/Navbar';
import { RoutePaths } from "@/shared/appLinks/RoutePaths";

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

    const navbarConfig: Partial<Record<keyof typeof RoutePaths, NavBarTypeWithNone>> = {
        [RoutePaths.MAIN]: 'None', // main should use its own navbar because of the intro component logic
        [RoutePaths.GAME_ART]: 'GameArt',
        [RoutePaths.cookies]: 'Cookies',
        [RoutePaths.privacy]: 'Privacy', // todo check why NavBarTypeWithNone check doesnt work
        [RoutePaths.auth]: 'None',
    };

    const navBarType = navbarConfig[pathAfterLang as keyof typeof RoutePaths] || 'Default';

    const shouldShowNavbar = navBarType !== 'None';

    return { navBarType, shouldShowNavbar };
}