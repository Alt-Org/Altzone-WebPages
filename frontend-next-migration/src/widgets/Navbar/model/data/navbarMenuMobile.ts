import {navbarItemType, NavbarMenuMobile, NavbarMenuMobileItem, NavLogoMobileObject} from "../types/types";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import img from "@/shared/assets/images/altLogo.png";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";
// import img from "./img.png";

export const navbarMenuMobile: NavbarMenuMobile = [
    {
        name: 'Pääsivu',
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
        accessErrorMsg: "Kirjaudu sisään nähdäksesi tämän osaston.",
        elements: [
            {
                elementText: "Klaaniesittelyt",
                link: {
                    isExternal: false,
                    path : RoutePaths.clan
                },
                isDisabled: {
                    status: false,
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
        ]
    },


    {
        name : 'Taide',
        type: navbarItemType.NavbarMenuMobileDropDownItem,
        elements: [
            {
                elementText: "Sarjakuvat",
                link: {
                    isExternal: false,
                    path : RoutePaths.COMICS_GALLERY
                }
            },

            {
                elementText: "Kuvagalleriat",
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
        name : 'Tekijät',
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