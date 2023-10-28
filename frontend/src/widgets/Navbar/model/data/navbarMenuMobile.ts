import {navbarItemType, NavbarMenuMobile, NavLogoMobileObject} from "../types/types";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import navLogo from "@/shared/assets/images/altLogo.png";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";


export const navbarMenuMobile: NavbarMenuMobile = Object.freeze([
    {
        name: 'Pääsivu',
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
        name : 'Yhteisö',
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
        name : 'Peli',
        type: navbarItemType.NavbarMenuMobileDropDownItem,
        elements: [
            {
                elementText: "Klaaniesittelyt",
                link: {
                    isExternal: false,
                    path : RoutePaths.clan
                },
                isDisabled: {
                    status: true,
                    reason: "Kirjadu ensin!"
                }
            },
            {
                elementText: "Leaderboard",
                link: {
                    isExternal: false,
                    path : AppExternalLinks.stub
                }
            },

            {
                elementText: "Hahmogalleria",
                link: {
                    isExternal: false,
                    path : AppExternalLinks.stub
                }
            },

            {
                elementText: "Kuvagalleria",
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
        name : 'Tekijät',
        path:  RoutePaths.MEMBERS,
        type: navbarItemType.NavbarMenuMobileItem
    },
]);


export const navLogoMobile: NavLogoMobileObject = {
    name: 'Main',
    path: RoutePaths.MAIN,
    src: navLogo
}