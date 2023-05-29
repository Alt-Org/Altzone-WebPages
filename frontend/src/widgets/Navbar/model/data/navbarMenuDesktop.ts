import navLogo from "@/shared/assets/images/altLogo.png";
import {NavbarMenu,LinkType} from "../types/types";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";

export const navbarMenuDesktop: NavbarMenu = Object.freeze([
    {
        name: 'Foorumi',
        path: AppExternalLinks.reddit,
        isActive: false,
        type: LinkType.navLink,
        position: "left"
    },
    {
        name: 'About',
        path: RoutePaths.ABOUT,
        isActive: false,
        type: LinkType.navLink,
        position: "left"
    },
    {
        name: 'Nav logo',
        path: RoutePaths.MAIN,
        src: navLogo,
        type: LinkType.navLogo,
        position: "center"
    },
    {
        name: 'Uutiset',
        path: RoutePaths.NEWS,
        isActive: false,
        type:  LinkType.navLink,
        position: "right"
    },
    {
        name: 'Tekijat',
        path:  RoutePaths.MEMBERS,
        isActive: false,
        type: LinkType.navLink,
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
    //     type: LinkType.navLinkFake,
    //     position : "right",
    //     reactKey: 'somekeyhere'
    // },
]);
