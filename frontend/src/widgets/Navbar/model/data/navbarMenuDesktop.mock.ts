import navLogo from "@/shared/assets/images/altLogo.png";
import {LinkType, NavbarMenu} from "../types/types";

export const navbarMenuDesktopMock: NavbarMenu = Object.freeze([
    {
        name: 'Foruumi',
        path: '/#forum',
        isActive: false,
        type: LinkType.navLink,
        position: "left"
    },
    {
        name: 'About',
        path: '/#about',
        isActive: false,
        type: LinkType.navLink,
        position: "left"
    },
    {
        name: 'Nav logo',
        src: navLogo,
        type: LinkType.navLogo,
        position: "center",
        path: '/#WorkersSection'
    },
    {
        name: 'Uutiset',
        path: '/#news',
        isActive: false,
        type: LinkType.navLink,
        position: "right"
    },
    {
        name: 'Tekijat',
        path: '/#workers',
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
    //     type: "navLinkFake",
    //     position : "right",
    //     reactKey: 'somekeyhere'
    // },
]);
