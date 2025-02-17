import { ReactNode } from 'react';

type Link = {
    isExternal: boolean;
    path: string;
};

export type DropDownElementASTextOrLink = {
    id?: string;
    elementText: string;
    link?: Link;
    active?: boolean;
    onClickCallback?: () => void;
    dataTestId?: string;
    isDisabled?: {
        status: boolean;
        reason: string;
    };
    accessErrorMsg?: string;
};

export type DropDownElement = DropDownElementASTextOrLink | ReactNode;

export type DropdownWrapperProps = {
    className?: string;
    contentClassName?: string;
    contentItemClassName?: string;
    childrenWrapperClassName?: string;
    contentAbsolute?: boolean;
    elements: Array<DropDownElement>;
    onOpen?: () => void;
    onClose?: () => void;
    isOpen: boolean;
    onClick?: () => void;
    children: ReactNode;
    dataTestId?: string;
    mouseOverLeaveMode?: boolean;
    isDisabled?: {
        status: boolean;
        reason: string;
    };
    openByDefault?: boolean;
};
