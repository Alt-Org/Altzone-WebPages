'use client'
import { memo } from "react";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import NavbarDesktopV2 from "../NavbarDesktopV2/NavbarDesktopV2";
import NavbarMobileV2 from "../NavbarMobileV2/NavbarMobileV2";
import { FixedProvider } from "@/widgets/Navbar/model/FixedProvider";
import { NavBarType } from "../../model/types";
import { getNavbarData } from "../../model/getNavbarData";



interface NavbarMainProps {
    overlaid?: boolean;
    marginTop?: number;
    className?: string;
    navBarType?: NavBarType;
}



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

