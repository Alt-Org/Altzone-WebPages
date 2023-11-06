import navLogo from "@/shared/assets/images/altLogo.png";
import {ItemType, NavbarMenu} from "../types/types";

export const navbarMenuDesktopMock: NavbarMenu = Object.freeze([
    {
        name: 'Foruumi',
        path: '/#forum',
        isActive: false,
        type: ItemType.navLink,
        position: "left"

    },
    {
        name: 'About',
        path: '/#about',
        isActive: false,
        type: ItemType.navLink,
        position: "left"
    },
    {
        name: 'Nav logo',
        src: navLogo as unknown as string,
        type: ItemType.navLogo,
        position: "center",
        path: '/#WorkersSection'
    },
    {
        name: 'Uutiset',
        path: '/#news',
        isActive: false,
        type: ItemType.navLink,
        position: "right"
    },
    {
        name: 'Tekijat',
        path: '/#workers',
        isActive: false,
        type: ItemType.navLink,
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
