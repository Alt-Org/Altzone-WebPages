import {ReactNode} from "react";
import {Footer} from "@/widgets/Footer";
import {ScrollTop} from "@/features/ScrollTop";

type Props = {
    children: ReactNode;
}

export default function Layout({children}: Props) {
    return (
        <>
            {children}
            <Footer />
            <ScrollTop />
        </>
    )
}