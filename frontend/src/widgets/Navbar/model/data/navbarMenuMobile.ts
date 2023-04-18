import {NavbarMenuMobile, NavLogoMobileObject} from "../types/types";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import navLogo from "@/shared/assets/images/altLogo.png";

export const navbarMenuMobile: NavbarMenuMobile = Object.freeze([
    {
        name: 'Main',
        path: RoutePaths.MAIN
    },

    {
        name : 'About',
        path: RoutePaths.ABOUT,
    },
    {
        name : 'Foruumi',
        path: '/#forum',
    },
    {
        name : 'Uutiset',
        path: '/#news',
    },
    {
        name : 'Tekijat',
        path:  RoutePaths.WORKERS,
    },
]);


export const navLogoMobile: NavLogoMobileObject = {
    name: 'Main',
    path: RoutePaths.MAIN,
    src: navLogo
}