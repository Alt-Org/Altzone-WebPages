import {ReactNode} from "react";
import {Navbar} from "@/widgets/Navbar";
import {Footer} from "@/widgets/Footer";
import {ScrollTop} from "@/features/ScrollTop";

type Props = {
    children: ReactNode;
}

export default function HomeLayout({children}: Props) {
    return (
        <>
            <Navbar overlaid />
            {children}
            <Footer />
            <ScrollTop />
        </>
    )
}