import {ReactNode} from "react";
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