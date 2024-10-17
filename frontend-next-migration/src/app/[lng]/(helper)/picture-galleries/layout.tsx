import {ReactNode} from "react";
import {Footer} from "@/widgets/Footer";

type Props = {
    children: ReactNode;
}

export default function PictureGalleriasLayout({children}: Props) {
    return (
        <>
            {children}
            <Footer />
        </>
    )
}