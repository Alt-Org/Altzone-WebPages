import { ReactNode } from 'react';

type Link = {
    isExternal: boolean;
    path: string;
};

export type DropDownElement = {
    id?: string;
    elementText: string;
    link?: Link;
    onClickCallback?: () => void;
    isDisabled?: {
        status: boolean;
        reason: string;
    };
    accessErrorMsg?: string;
};

export type DropdownWrapperProps = {
    className?: string;
    contentClassName?: string;
    contentItemClassName?: string;
    childrenWrapperClassName?: string;
    contentAbsolute?: boolean;
    elements: Array<DropDownElement>;
    onOpen?: () => void;
    onClose?: () => void;
    children: ReactNode;
    mouseOverLeaveMode?: boolean;
    isDisabled?: {
        status: boolean;
        reason: string;
    };
};
