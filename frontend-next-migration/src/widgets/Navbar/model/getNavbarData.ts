import {NavBarType} from "./types";
import {
    navbarClanMobile,
    navbarGameArtMobile,
    navbarMenuMobile,
    navbarTeachingMobile
} from "./data/navbarMenuMobile";
import {
    navbarClanDesktop, navbarGameArtDesktop,
    navbarMenuDesktop2,
    navbarTeachingDesktop
} from "./data/navbarMenuDesktop";

export const getNavbarData = (type: NavBarType, isMobileSize: boolean) => {
    if (isMobileSize) {
        switch (type) {
            case "Default":
                return navbarMenuMobile;
            case "Clan":
                return navbarClanMobile;
            case "TeachingPackage":
                return navbarTeachingMobile;
            case "GameArt":
                return navbarGameArtMobile;
            default:
                return navbarMenuMobile;
        }
    } else {
        switch (type) {
            case "Default":
                return navbarMenuDesktop2;
            case "Clan":
                return navbarClanDesktop;
            case "TeachingPackage":
                return navbarTeachingDesktop;
            case "GameArt":
                return navbarGameArtDesktop;
            default:
                return navbarMenuDesktop2;
        }
    }
};