import {lazy, memo, Suspense} from "react";
import useIsMobile from "@/shared/lib/hooks/useIsMobile";
import {navbarMenuDesktop} from "../../model/data/navbarMenuDesktop";
import {navbarMenuTouch} from "../../model/data/navbarMenuTouch";
import {Loader} from "@/shared/ui/Loader";

const NavbarDesktop = lazy(() => import('../NavbarDesktop/NavbarDesktop'));
const NavbarTouch = lazy(() => import('../NavBarTouch/NavbarTouch'));

interface NavbarMainProps {
    overlayed?: boolean;
    marginTop?: number;
}

export const NavbarMain = memo((props: NavbarMainProps) => {
    const {overlayed, marginTop} = props;
    const {isMobile} = useIsMobile();

    if (isMobile) {
        return (
            <Suspense fallback={<Loader/>}>
                <NavbarTouch overlayed={overlayed} marginTop={marginTop} navBarItemsList={navbarMenuTouch}/>
            </Suspense>
        );
    }

    return (
        <Suspense fallback={<Loader/>}>
            <NavbarDesktop navbarMenu={navbarMenuDesktop} overlayed={overlayed} marginTop={marginTop}/>
        </Suspense>
    );
});
