import { ReactNode } from 'react';
import { DropDownElement } from '@/shared/ui/DropdownWrapper';

export enum NavMenuItemType {
    Dropdown = 'NavMenuDropdown',
    Link = 'NavMenuLink',
    Element = 'NavMenuElement',
}

export type INavMenuDropdown = {
    type: NavMenuItemType.Dropdown;
    name: string;
    elements: DropDownElement[];
    active?: boolean;
};

export type INavMenuLink = {
    type: NavMenuItemType.Link;
    path: string;
    name: string;
    active?: boolean;
};

export type INavMenuElement = {
    type: NavMenuItemType.Element;
    element: ReactNode;
};

export type INavMenuItem = INavMenuLink | INavMenuDropdown | INavMenuElement;
