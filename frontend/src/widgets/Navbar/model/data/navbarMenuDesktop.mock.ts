import navLogo from "@/shared/assets/images/altLogo.png";
import {NavbarMenu} from "../types/types";

export const navbarMenuDesktopMock: NavbarMenu = Object.freeze([
    {
        name: 'Foruumi',
        path: '/#forum',
        isActive: false,
        type: 'navLink',
        position: "left"
    },
    {
        name: 'About',
        path: '/#about',
        isActive: false,
        type: 'navLink',
        position: "left"
    },
    {
        name: 'Nav logo',
        src: navLogo,
        type: 'navLogo',
        position: "center"
    },
    {
        name: 'Uutiset',
        path: '/#news',
        isActive: false,
        type: 'navLink',
        position: "right"
    },
    {
        name: 'Tekijat',
        path: '/#workers',
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
