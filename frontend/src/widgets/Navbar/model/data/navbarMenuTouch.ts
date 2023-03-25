import {RoutePath} from "@/app/providers/router/config/routeConfig";
import {NavbarMenuTouch} from "../types/types";

export const navbarMenuTouch: NavbarMenuTouch = Object.freeze([
    {
        name: 'Main',
        path: RoutePath.main
    },

    {
        name : 'About',
        path: RoutePath.about,
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
        path: '/#workers',
    },
]);