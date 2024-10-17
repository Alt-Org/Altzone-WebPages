import {ReactNode} from "react";
import {ScrollTop} from "@/features/ScrollTop";

type Props = {
    children: ReactNode;
}

export default function TeamLayout({children}: Props) {
    return (
        <>
            {children}
            <ScrollTop />
        </>
    )
}