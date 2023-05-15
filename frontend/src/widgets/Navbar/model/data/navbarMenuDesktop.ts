import navLogo from "@/shared/assets/images/altLogo.png";
import {NavbarMenu} from "../types/types";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";

export const navbarMenuDesktop: NavbarMenu = Object.freeze([
    {
        name: 'Foruumi',
        path: '#forum',
        isActive: false,
        type: 'navLink',
        position: "left"
    },
    {
        name: 'About',
        path: RoutePaths.ABOUT,
        isActive: false,
        type: 'navLink',
        position: "left"
    },
    {
        name: 'Nav logo',
        path: RoutePaths.MAIN,
        src: navLogo,
        type: 'navLogo',
        position: "center"
    },
    {
        name: 'Uutiset',
        path: RoutePaths.NEWS,
        isActive: false,
        type: 'navLink',
        position: "right"
    },
    {
        name: 'Tekijat',
        path:  RoutePaths.WORKERS,
        isActive: false,
        type: "navLink",
        position: "right"
    },

    // {
    //     name : 'Tekijat',
    //     path: '/#workers',
    //     isActive: false,
    //     type: "navLink",
    //     position : "right"
    // },

    // {
    //     name : '⠀⠀⠀⠀',
    //     type: "navLinkFake",
    //     position : "right",
    //     reactKey: 'somekeyhere'
    // },
]);
