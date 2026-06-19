import { DropDownElement } from '@/shared/ui/DropdownWrapper';

/** Tells apart the different kinds of navbar items. */
export enum ItemType {
    navLink = 'navLink',
    navLogo = 'navLogo',
    navDropDown = 'navDropDown',
}

/** A basic link that goes somewhere. */
export type NavbarLinkObject = {
    name: string;
    path: string;
    type: ItemType.navLink;
};

/** A dropdown that shows a popup menu; can also act as a link if `path` is set. */
export type NavbarDropDownObject = {
    name: string;
    /** Where clicking the label takes you (optional). */
    path?: string;
    elements: Array<DropDownElement>;
    type: ItemType.navDropDown;
};

/** The site logo in the navbar. */
export type NavLogoObject = {
    name: string;
    src: string;
    path: string;
    type: ItemType.navLogo;
};

/** Any item that can appear in the navbar menu. */
export type NavbarMenuItem = NavbarLinkObject | NavLogoObject | NavbarDropDownObject;

export type NavbarMenu = NavbarMenuItem[];

export type NamedMenu = {
    [ItemType.navLogo]?: NavLogoObject;
};

export type NavbarBuild = {
    menu: NavbarMenu;
    namedMenu: NamedMenu;
};
