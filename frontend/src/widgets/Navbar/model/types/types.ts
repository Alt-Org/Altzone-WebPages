import {DropDownElement} from "@/shared/ui/DropdownWrapper";

export type Position = "left" | "right" | "center"

export enum ItemType {
    navLinkFake = "navLinkFake",
    navLink = "navLink",
    navLogo = "navLogo",
    navDropDown = "navDropDown"
}


export interface NavbarLinkFakeObject{
    name: string;
    type: ItemType.navLinkFake;
    position: Position;
    reactKey: string;
}

export interface NavbarLinkObject {
    name: string;
    path: string;
    isActive: boolean;
    type : ItemType.navLink;
    position: Position
}

export interface NavbarDropDownObject{
    name: string;
    isActive: boolean;
    elements: Array<DropDownElement>
    type : ItemType.navDropDown;
    position: Position
}

export interface NavLogoObject{
    name: string;
    src: string;
    path: string;
    type : ItemType.navLogo;
    position: Position
}

export type PositionChecker = (position: Position) => boolean;

export type NavbarMenu = ReadonlyArray<(NavbarLinkObject | NavLogoObject | NavbarLinkFakeObject |NavbarDropDownObject )>;


// touch

export type NavLogoMobileObject = {
    name: string;
    path: string;
    src: string;
}

export enum navbarItemType{
    NavbarMenuMobileItem= "NavbarMenuMobileItem",
    NavbarMenuMobileDropDownItem= "NavbarMenuMobileDropDownItem"
}

export type NavbarMenuMobileItem = {
    type: navbarItemType.NavbarMenuMobileItem
    name: string;
    path: string;
}

export type NavbarMenuMobileDropDownItem = {
    type: navbarItemType.NavbarMenuMobileDropDownItem
    name: string;
    elements: Array<DropDownElement>
}

export type NavbarMenuMobile = ReadonlyArray<NavbarMenuMobileItem | NavbarMenuMobileDropDownItem>
