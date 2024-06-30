import {Navbar} from "@/widgets/Navbar";
import { Footer } from '@/widgets/Footer';
import {ReactNode} from "react";

interface Props {
    children?: ReactNode;
}


export default function Layout({ children}: Props) {
    return (
        <>
            <Navbar overlaid={true} />
            <main>{children}</main>
            <Footer />
        </>
    )
}