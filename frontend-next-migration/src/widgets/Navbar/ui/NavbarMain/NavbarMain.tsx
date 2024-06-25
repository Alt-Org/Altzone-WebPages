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
import {FixedProvider} from "@/widgets/Navbar/model/FixedProvider";

interface NavbarMainProps {
    overlaid?: boolean;
    marginTop?: number;
    className?: string;
}

/**
 NavbarMain renders the appropriate navbar component based on the screen size.
 For desktop, it loads NavbarDesktopMobile component that handles the logic
 to avoid showing loaders when resizing the screen.
 For touch devices, it loads NavbarMobileV2 or NavbarDesktop based on the screen size.
 @param {Object} props - The props object of the component.
 @param {boolean} props.overlayed - Determines whether the navbar should have an overlay effect or not.
 @param {number} props.marginTop - The margin top of the navbar.
 @returns {JSX.Element} - The appropriate navbar component.
 */
export const NavbarMain = memo((props: NavbarMainProps) => {

    const { overlaid, marginTop, className } = props;

    const { isMobileSize } = useIsMobileSize();

    if (isMobileSize) {
        return (
            <FixedProvider>
                <NavbarMobileV2 overlaid={overlaid} marginTop={marginTop} className={className} navbarBuild={navbarMenuMobile} />
            </FixedProvider>
        )
    }
    return (
        <>
            <FixedProvider>
                <NavbarDesktopV2 navbarBuild={navbarMenuDesktop2} overlaid={overlaid} className={className} marginTop={marginTop} />
            </FixedProvider>
        </>
    )


});

export const NavbarClanMain = memo((props: NavbarMainProps) => {

    const { overlaid, marginTop, className } = props;

    const { isMobileSize } = useIsMobileSize();

    if (isMobileSize) {
        return (
            <NavbarMobileV2 overlaid={overlaid} marginTop={marginTop} className={className} navbarBuild={navbarClanMobile} />
        )
    }
    return (
        <>
            <FixedProvider>
                <NavbarDesktopV2
                    navbarBuild={navbarClanDesktop}
                    overlaid={overlaid}
                    className={className}
                    marginTop={marginTop}
                />
            </FixedProvider>
        </>
    )


});



export const NavbarTeachingMain = memo((props: NavbarMainProps) => {
    const { overlaid, marginTop, className } = props;

    const { isMobileSize } = useIsMobileSize();

    if (isMobileSize) {
        return (
            <>
                <FixedProvider>
                    <NavbarMobileV2
                        overlaid={overlaid}
                        marginTop={marginTop}
                        className={className}
                        navbarBuild={navbarTeachingMobile}
                    />
                </FixedProvider>
            </>
        );
    }
    return (
        <>
            <FixedProvider>
                <NavbarDesktopV2
                    navbarBuild={navbarTeachingDesktop}
                    overlaid={overlaid}
                    className={className}
                    marginTop={marginTop}
                />
            </FixedProvider>
        </>
    );
});

NavbarMain.displayName = 'NavbarMain';
NavbarTeachingMain.displayName = 'NavbarTeachingMain';
//---------------------------------------------------------------------------//
export const NavbarGameArtMain = memo((props: NavbarMainProps) => {
    const { overlaid, marginTop, className } = props;

    const { isMobileSize } = useIsMobileSize();

    if (isMobileSize) {
        return (
            <>
                <FixedProvider>
                    <NavbarMobileV2
                        overlaid={overlaid}
                        marginTop={marginTop}
                        className={className}
                        navbarBuild={navbarGameArtMobile}
                    />
                </FixedProvider>
            </>
        );
    }
    return (
        <>
            <FixedProvider>
                <NavbarDesktopV2
                    navbarBuild={navbarGameArtDesktop}
                    overlaid={overlaid}
                    className={className}
                    marginTop={marginTop}
                />
            </FixedProvider>
        </>
    );
});

NavbarMain.displayName = "NavbarMain";
NavbarClanMain.displayName = "NavbarClanMain";