import { DropDownElement } from '@/shared/ui/DropdownWrapper';

export enum ItemType {
    navLink = 'navLink',
    navLogo = 'navLogo',
    navDropDown = 'navDropDown',
}

export type NavbarLinkObject = {
    name: string;
    path: string;
    isActive: boolean;
    type: ItemType.navLink;
    position?: string;
    accessErrorMsg?: string;
};

export type NavbarDropDownObject = {
    name: string;
    isActive: boolean;
    elements: Array<DropDownElement>;
    type: ItemType.navDropDown;
    position?: string;
    accessErrorMsg?: string;
};

export type NavLogoObject = {
    name: string;
    src: string;
    path: string;
    type: ItemType.navLogo;
    position?: string;
    accessErrorMsg?: string;
};

export type NavbarMenuItem = NavbarLinkObject | NavLogoObject | NavbarDropDownObject;

export type NavbarMenu = NavbarMenuItem[];

export type NamedMenu = {
    [ItemType.navLogo]?: NavLogoObject;
};

export type NavbarBuild = {
    menu: NavbarMenu;
    namedMenu: NamedMenu;
};
