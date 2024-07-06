import {ReactNode} from "react";

type Props = {
    children: ReactNode;
}

export default function HomeLayout({children}: Props) {
    return (
        <>
            {children}
        </>
    )
}