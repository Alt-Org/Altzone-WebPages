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
        name : 'Foorumi',
        path: '/#forum',
    },
    {
        name : 'Uutiset',
        path: RoutePaths.NEWS,
    },
    {
        name : 'Tekijat',
        path:  RoutePaths.MEMBERS,
    },
]);


export const navLogoMobile: NavLogoMobileObject = {
    name: 'Main',
    path: RoutePaths.MAIN,
    src: navLogo
}