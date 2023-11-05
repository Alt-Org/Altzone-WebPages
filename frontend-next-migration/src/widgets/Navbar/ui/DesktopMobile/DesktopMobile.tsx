import NavbarDesktop from '../NavbarDesktop/NavbarDesktop';
import NavbarMobile from '../NavbarMobile/NavbarMobile';
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import {memo} from "react";
import {navbarMenuMobile} from "@/widgets/Navbar/model/data/navbarMenuMobile";
import {navbarMenuDesktop} from "@/widgets/Navbar/model/data/navbarMenuDesktop";

export interface NavbarDesktopMobileProps {
    overlayed?: boolean;
    marginTop?: number;
}

/**
 * Renders the appropriate navbar component based on the screen size,
 * solution to avoid lazy loading for desktop
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.overlayed - Whether the navbar should be overlayed.
 * @param {number} props.marginTop - The margin top value for the navbar.
 * @returns {JSX.Element} The rendered component.
 */
const NavbarDesktopMobile = memo(({overlayed, marginTop}: NavbarDesktopMobileProps) => {
    const {isMobileSize} = useIsMobileSize();

    if (isMobileSize) {
        return (
            <NavbarMobile overlayed={overlayed} marginTop={marginTop} navBarItemsList={navbarMenuMobile}/>
        );
    }

    return (
        <NavbarDesktop navbarMenu={navbarMenuDesktop} overlayed={overlayed} marginTop={marginTop}/>
    );
});

NavbarDesktopMobile.displayName = "NavbarDesktopMobile";

export default NavbarDesktopMobile;







