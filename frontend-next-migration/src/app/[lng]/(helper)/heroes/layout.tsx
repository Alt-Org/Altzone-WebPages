import {Navbar} from "@/widgets/Navbar";
import { Footer } from '@/widgets/Footer';
import {ReactNode} from "react";
import {HorizontalLines} from "@/shared/ui/HorizontalLines";

interface Props {
    children?: ReactNode;
}

export default function Layout({ children}: Props) {
    return (
        <>
            {children}
            <HorizontalLines />
            <Footer />
        </>
    )
}