export enum ItemType {
    navLink = 'navLink',
    navLogo = 'navLogo',
}

export type NavbarLinkObject = {
    name: string;
    path: string;
    isActive: boolean;
    type: ItemType.navLink;
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

export type NavbarMenuItem = NavbarLinkObject | NavLogoObject;

export type NavbarMenu = NavbarMenuItem[];

export type NamedMenu = {
    [ItemType.navLogo]?: NavLogoObject;
};

export type NavbarBuild = {
    menu: NavbarMenu;
    namedMenu: NamedMenu;
};
