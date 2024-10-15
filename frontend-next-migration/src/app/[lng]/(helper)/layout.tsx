import {ReactNode} from "react";
import {Navbar} from "@/widgets/Navbar";
import {Footer} from "@/widgets/Footer";
import {_NavbarForHelperRoute} from "@/app/[lng]/(helper)/_NavbarForHelperRoute";

type Props = {
    children: ReactNode;
}

export default function HelperLayout({children}: Props) {
    return (
        <>
            <_NavbarForHelperRoute/>
            {children}
        </>
    )
}