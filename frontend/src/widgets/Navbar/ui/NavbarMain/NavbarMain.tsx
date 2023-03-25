import {lazy, memo} from "react";
import useIsMobile from "@/shared/lib/hooks/useIsMobile";
import {navbarMenuDesktop} from "../../model/data/navbarMenuDesktop";

const NavbarDesktop = lazy(() => import('../NavbarDesktop/NavbarDesktop'));

const NavbarTouch = lazy(() => import('../NavBarTouch/NavbarTouch'));


interface NavbarMainProps {
    overlayed ?: boolean;
    marginTop?: number;
}


export const NavbarMain = memo((props: NavbarMainProps) => {

    const {overlayed,marginTop} = props;

    const {isMobile} = useIsMobile();


    if(isMobile){
        return (
            <NavbarTouch overlayed={overlayed} marginTop={marginTop}/>
        )
    }

    return <NavbarDesktop navbarMenu={navbarMenuDesktop} overlayed={overlayed} marginTop={marginTop}/>

})
