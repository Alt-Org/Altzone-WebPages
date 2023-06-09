import {ReactNode} from "react";

type Link = {
    isExternal : boolean;
    path: string
}

export type DropDownElement = {
    id?: string;
    elementText: string;
    link?: Link;
    onClickCallback?: () => void;
}


export interface DropdownWrapperProps {
    className?: string;
    contentClassName?: string;
    contentItemClassName?: string;
    childrenWrapperClassName?: string;
    contentAbsolute?: boolean;
    elements: Array<DropDownElement>;
    onOpen?: () => void;
    onClose?: () => void;
    children: ReactNode;
}

