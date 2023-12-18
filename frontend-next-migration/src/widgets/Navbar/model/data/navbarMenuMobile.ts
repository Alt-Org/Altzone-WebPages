import {navbarItemType, NavbarMenuMobile, NavbarMenuMobileItem, NavLogoMobileObject} from "../types/types";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import img from "@/shared/assets/images/altLogo.png";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";
// import img from "./img.png";

export const navbarMenuMobile: NavbarMenuMobile = [
    {
        name: 'main',
        path: RoutePaths.MAIN,
        type: navbarItemType.NavbarMenuMobileItem,
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
        name : 'community',
        type: navbarItemType.NavbarMenuMobileDropDownItem,
        elements: [
            {
                elementText: "forum",
                link: {
                    isExternal: true,
                    path : AppExternalLinks.reddit
                }
            },
            {
                elementText: "feedback",
                link: {
                    isExternal: true,
                    path : AppExternalLinks.googleFeedback
                }
            },
        ]
    },

    {
        name : 'game',
        type: navbarItemType.NavbarMenuMobileDropDownItem,
        accessErrorMsg: "Kirjaudu sisään nähdäksesi tämän osaston.",
        elements: [
            {
                elementText: "clans",
                link: {
                    isExternal: false,
                    path : RoutePaths.clan_all
                },
                isDisabled: {
                    status: false,
                    reason: "SignUpFirst"
                }
            },
            {
                elementText: "leaderboard",
                link: {
                    isExternal: false,
                    path : AppExternalLinks.stub
                }
            },
        ]
    },


    {
        name : 'art',
        type: navbarItemType.NavbarMenuMobileDropDownItem,
        elements: [
            {
                elementText: "comics",
                link: {
                    isExternal: false,
                    path : RoutePaths.COMICS_GALLERY
                }
            },

            {
                elementText: "galleries",
                link: {
                    isExternal: false,
                    path: RoutePaths.PICTURE_GALLERY,
                }
            },
        ]
    },

    //
    // {
    //     name : 'Uutiset',
    //     path: RoutePaths.NEWS,
    //     type: navbarItemType.NavbarMenuMobileItem
    // },
    {
        name : 'team',
        path:  RoutePaths.MEMBERS,
        type: navbarItemType.NavbarMenuMobileItem
    },
];



export const navLogoMobile: NavLogoMobileObject = {
    name: 'Main',
    path: RoutePaths.MAIN,
    // src: navLogo  as unknown as string,
    src: img as unknown as string,
}