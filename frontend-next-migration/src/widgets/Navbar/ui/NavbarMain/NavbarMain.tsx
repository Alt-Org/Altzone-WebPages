'use client'
import {memo} from "react";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import {navbarMenuDesktop, navbarMenuDesktop2} from "../../model/data/navbarMenuDesktop";
import { navbarMenuMobile} from "../../model/data/navbarMenuMobile";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import NavbarDesktop from "../NavbarDesktop/NavbarDesktop";
import NavbarDesktopV2 from "../NavbarDesktopV2/NavbarDesktopV2";
import {Container} from "@/shared/ui/Container";

interface NavbarMainProps {
    overlaid?: boolean;
    marginTop?: number;
    className?: string;
}

/**
 NavbarMain renders the appropriate navbar component based on the screen size.
 For desktop, it loads NavbarDesktopMobile component that handles the logic
 to avoid showing loaders when resizing the screen.
 For touch devices, it loads NavbarMobile or NavbarDesktop based on the screen size.
 @param {Object} props - The props object of the component.
 @param {boolean} props.overlayed - Determines whether the navbar should have an overlay effect or not.
 @param {number} props.marginTop - The margin top of the navbar.
 @returns {JSX.Element} - The appropriate navbar component.
 */
export const NavbarMain = memo((props: NavbarMainProps) => {

    const {overlaid, marginTop, className} = props;

    const {isMobileSize} = useIsMobileSize();

        if(isMobileSize){
            return (
            // <Suspense fallback=''>
                <NavbarMobile overlaid={overlaid} marginTop={marginTop} className={className} navbarBuild={navbarMenuMobile}/>
            // </Suspense>
        )
        }
        return (
            <>
            {/*// <Suspense fallback=''>*/}
            {/*    <NavbarDesktop navbarBuild={navbarMenuDesktop} overlaid={overlaid } className={className} marginTop={marginTop}/>*/}



            <NavbarDesktopV2 navbarBuild={navbarMenuDesktop2}/>
</>
            // {/*// </Suspense>*/}
        )


});

NavbarMain.displayName = "NavbarMain";
