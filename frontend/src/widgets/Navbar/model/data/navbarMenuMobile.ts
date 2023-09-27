import {navbarItemType, NavbarMenuMobile, NavLogoMobileObject} from "../types/types";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import navLogo from "@/shared/assets/images/altLogo.png";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";


export const navbarMenuMobile: NavbarMenuMobile = Object.freeze([
    {
        name: 'Main',
        path: RoutePaths.MAIN,
        type: navbarItemType.NavbarMenuMobileItem
    },

    // {
    //     name : 'About',
    //     path: RoutePaths.ABOUT,
    //     type: navbarItemType.NavbarMenuMobileItem
    // },

    // {
    //     name : 'Foorumi',
    //     path: AppExternalLinks.reddit,
    //     type: navbarItemType.NavbarMenuMobileItem
    // },

    {
        name : 'Yhteiso',
        type: navbarItemType.NavbarMenuMobileDropDownItem,
        elements: [
            {
                elementText: "Foorumi",
                link: {
                    isExternal: true,
                    path : AppExternalLinks.reddit
                }
            },
            {
                elementText: "Palaute",
                link: {
                    isExternal: true,
                    path : AppExternalLinks.googleFeedback
                }
            },
        ]
    },

    {
        name : 'peli',
        type: navbarItemType.NavbarMenuMobileDropDownItem,
        elements: [
            {
                elementText: "klaaniesittelyt",
                link: {
                    isExternal: false,
                    path : RoutePaths.clan
                }
            },
            {
                elementText: "leaderboard",
                link: {
                    isExternal: false,
                    path : AppExternalLinks.stub
                }
            },

            {
                elementText: "hahmogalleria",
                link: {
                    isExternal: false,
                    path : AppExternalLinks.stub
                }
            },

            {
                elementText: "kuvagalleria",
                link: {
                    isExternal: false,
                    path: RoutePaths.PICTURE_GALLERY,
                }
            },
        ]
    },



    {
        name : 'Uutiset',
        path: RoutePaths.NEWS,
        type: navbarItemType.NavbarMenuMobileItem
    },
    {
        name : 'Tekijat',
        path:  RoutePaths.MEMBERS,
        type: navbarItemType.NavbarMenuMobileItem
    },
]);


export const navLogoMobile: NavLogoMobileObject = {
    name: 'Main',
    path: RoutePaths.MAIN,
    src: navLogo
}