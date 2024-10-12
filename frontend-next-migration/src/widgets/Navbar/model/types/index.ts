import { DropDownElement } from '@/shared/ui/DropdownWrapper';

export type Position = 'left' | 'right' | 'center';

export enum ItemType {
  navLinkFake = 'navLinkFake',
  navLink = 'navLink',
  navLogo = 'navLogo',
  navDropDown = 'navDropDown',
  navAuthLogin = 'navAuthLogin',
  navAuthProfile = 'navAuthProfile',
}

export type NavbarLinkFakeObject = {
  name: string;
  type: ItemType.navLinkFake;
  position: Position;
  reactKey: string;
};

export type NavbarLinkObject = {
  name: string;
  path: string;
  isActive: boolean;
  type: ItemType.navLink;
  position?: Position;
  accessErrorMsg?: string;
};

export type NavbarDropDownObject = {
  name: string;
  isActive: boolean;
  elements: Array<DropDownElement>;
  type: ItemType.navDropDown;
  position?: Position;
  accessErrorMsg?: string;
};

export type NavLogoObject = {
  name: string;
  src: string;
  path: string;
  type: ItemType.navLogo;
  position?: Position;
  accessErrorMsg?: string;
};

export type NavAuthLogin = {
  name: string;
  path: string;
  type: ItemType.navAuthLogin;
};

export type NavAuthProfile = {
  name: string;
  src?: string;
  type: ItemType.navAuthProfile;
  elements: Array<DropDownElement>;
};

export type NavBarAuth = NavAuthLogin | NavAuthProfile;

export type PositionChecker = (position: Position) => boolean;

export type NavbarMenuItem =
  | NavbarLinkObject
  | NavLogoObject
  | NavbarLinkFakeObject
  | NavbarDropDownObject
  | NavBarAuth;

export type NavbarMenu = NavbarMenuItem[];

export type NamedMenu = {
  [ItemType.navAuthLogin]?: NavAuthLogin;
  [ItemType.navAuthProfile]?: NavAuthProfile;
  [ItemType.navLogo]?: NavLogoObject;
};

export type NavbarBuild = {
  menu: NavbarMenu;
  namedMenu: NamedMenu;
};

export type NavBarType =
  | 'Default'
  | 'GameArt'
  | 'Cookies'
  | 'Privacy'
  | 'None'
