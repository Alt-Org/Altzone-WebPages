import navLogo from "@/shared/assets/images/altLogo.png";
import {ItemType, NavbarMenu} from "../types/types";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";


export const navbarMenuDesktop: NavbarMenu = Object.freeze([

    // {
    //     name: "login",
    //     type: ItemType.navAuthLogin,
    //     path: RoutePaths.auth_login
    // },
    //
    // {
    //     name: "Profile",
    //     src: "string",
    //     type: ItemType.navAuthProfile,
    //     elements: [
    //         {
    //             elementText: "Foorumi",
    //             link: {
    //                 path: AppExternalLinks.reddit,
    //                 isExternal: true
    //             }
    //         },
    //     ]
    // },

    {

        name: 'Yhteisö',
        elements: [
            {
                elementText: "Foorumi",
                link: {
                    path: AppExternalLinks.reddit,
                    isExternal: true
                }

            },

            {
                elementText: "Palaute",
                link: {
                    path: AppExternalLinks.googleFeedback,
                    isExternal: true
                }
            },

        ],
        isActive: false,
        type: ItemType.navDropDown,
        position: "left"
    },

    {

        name: 'Peli',
        elements: [
            {
                elementText: "Klaaniesittelyt",
                link: {
                    path: RoutePaths.clan,
                    isExternal: false
                },
                isDisabled: {
                    status: false,
                    reason: "Kirjadu ensin!"
                }
            },

            {
                elementText: "Leaderboard",
                link: {
                    path: AppExternalLinks.stub,
                    isExternal: false
                }
            },

            {
                elementText: "Hahmogalleria",
                link: {
                    path: AppExternalLinks.stub,
                    isExternal: false
                }
            },

            {
                elementText: "Kuvagalleria",
                link: {
                    path: RoutePaths.PICTURE_GALLERY,
                    isExternal: false
                }
            },

        ],
        isActive: false,
        type: ItemType.navDropDown,
        position: "left"
    },

    // {
    //     name: 'About',
    //     path: RoutePaths.ABOUT,
    //     isActive: false,
    //     type: ItemType.navLink,
    //     position: "left"
    // },
    {
        name: 'Nav logo',
        path: RoutePaths.MAIN,
        src: navLogo,
        type: ItemType.navLogo,
        position: "center"
    },
    {
        name: 'Uutiset',
        path: RoutePaths.NEWS,
        isActive: false,
        type:  ItemType.navLink,
        position: "right"
    },
    {
        name: 'Tekijät',
        path:  RoutePaths.MEMBERS,
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
    //     type: ItemType.navLinkFake,
    //     position : "right",
    //     reactKey: 'somekeyhere'
    // },
]);


export const navbarMenuLoginProfile = {
    'login': {
        name: "LOGIN",
        type: ItemType.navAuthLogin,
        path: RoutePaths.auth_login
    },
    'profile': {
        name: "PROFILE",
        type: ItemType.navAuthProfile,
        elements: [
            {
                elementText: 'Foorumi',
                link: {
                    path: AppExternalLinks.reddit,
                    isExternal: true
                }
            }
        ]
    }
};
