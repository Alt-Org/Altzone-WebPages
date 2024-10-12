'use client'
import {ReactNode} from "react";
import {usePathname} from "next/navigation";
import {Navbar, NavBarType} from '@/widgets/Navbar';
import {RoutePaths} from "@/shared/appLinks/RoutePaths";


interface Props {
    children: ReactNode;
}

export type NavBarTypeWithNone = NavBarType | 'None';

export default function Template(props: Props) {
    const {children} = props;

    //todo add an external helper hook for this
    const pathname = usePathname();
    const segments = pathname.split('/').slice(2);
    const pathAfterLang = segments.length > 0 ? `/${segments.join('/')}` : '/';
    const navbarConfig: Partial<Record<keyof typeof RoutePaths, NavBarTypeWithNone>> = {
        [RoutePaths.MAIN]: 'Default',
        [RoutePaths.clan]: 'Clan',
        [RoutePaths.GAME_ART]: 'GAME_ART',
        [RoutePaths.cookies]: 'Cookies',
        [RoutePaths.auth]: 'None',
    };
    const navBarType = navbarConfig[pathAfterLang as keyof typeof RoutePaths] || 'Default';
    const shouldShowNavbar = navBarType !== 'None';

    return (
        <>
            {shouldShowNavbar && <Navbar navBarType={navBarType}/>}
            {children}
        </>
    )
}