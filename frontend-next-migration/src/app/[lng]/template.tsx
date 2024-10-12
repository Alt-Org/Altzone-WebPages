'use client'
import {ReactNode} from "react";
import {usePathname} from "next/navigation";

interface Props {
    children: ReactNode;
}

export default function Template(props: Props) {
    const {children} = props;

    //todo add an external helper hook for this
    const pathname = usePathname();
    const segments = pathname.split('/');
    const pathAfterLang = segments.slice(2).join('/') || '/';


    return (
        <>
            {/*{lng}*/}
            {children}
        </>
    )
}