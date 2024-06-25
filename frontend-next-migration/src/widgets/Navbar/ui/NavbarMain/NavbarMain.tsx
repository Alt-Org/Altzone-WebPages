'use client'
import { memo } from "react";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import {
    navbarMenuDesktop2,
    navbarClanDesktop,
    navbarTeachingDesktop,
    navbarGameArtDesktop
} from "../../model/data/navbarMenuDesktop";
import {
    navbarMenuMobile,
    navbarClanMobile,
    navbarTeachingMobile,
    navbarGameArtMobile
} from "../../model/data/navbarMenuMobile";
import NavbarDesktopV2 from "../NavbarDesktopV2/NavbarDesktopV2";
import NavbarMobileV2 from "../NavbarMobileV2/NavbarMobileV2";
import { FixedProvider } from "@/widgets/Navbar/model/FixedProvider";

type NavBarType = "Default" | "Clan" | "TeachingPackage" | "GameArt";

interface NavbarMainProps {
    overlaid?: boolean;
    marginTop?: number;
    className?: string;
    navBarType?: NavBarType;
}

const getNavbarData = (type: NavBarType, isMobileSize: boolean) => {
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

export const NavbarMain = memo((props: NavbarMainProps) => {
    const {
        overlaid,
        marginTop,
        className,
        navBarType = "Default" } = props;
    const { isMobileSize } = useIsMobileSize();
    const navbarBuild = getNavbarData(navBarType, isMobileSize);

    return (
        <FixedProvider>
            {isMobileSize ? (
                <NavbarMobileV2 overlaid={overlaid} marginTop={marginTop} className={className} navbarBuild={navbarBuild} />
            ) : (
                <NavbarDesktopV2 overlaid={overlaid} marginTop={marginTop} className={className} navbarBuild={navbarBuild} />
            )}
        </FixedProvider>
    );
});

NavbarMain.displayName = "NavbarMain";

