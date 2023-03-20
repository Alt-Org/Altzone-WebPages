// import navLogo from "@/shared/assets/images/navLogo.png";
import navLogo from "@/shared/assets/images/navLogoReal.png";
import {NavbarMenu} from "../types/types";

export const navbarMenuDesktop:  NavbarMenu = [
    {
        name : 'Foruumi',
        // path: RoutePath.forum,
        path: '/#forum',
        isActive : false,
        type : 'navLink',
        position: "left"
    },
    {
        name : 'About',
        // path: RoutePath.about,
        path: '/#about',
        isActive : false,
        type : 'navLink',
        position: "left"
    },


    {
        name: 'Nav logo',
        src : navLogo,
        type : 'navLogo',
        position: "center"
    },

    {
        name : 'Uutiset',
        path: '/#news',
        isActive : false,
        type : 'navLink',
        position: "right"
    },
    {
        name : 'Tekijat',
        path: '/#workers',
        isActive: false,
        type: "navLink",
        position : "right"
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

]