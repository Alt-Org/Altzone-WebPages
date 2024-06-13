import {DropDownElement} from "@/shared/ui/DropdownWrapper";


export enum sidebarItemType  {
    ISidebarItemBasic = "ISidebarItemBasic",
    ISidebarItemDropDown = "ISidebarItemDropDown"
}

export type ISidebarItemBasic = {
    type : sidebarItemType.ISidebarItemBasic
    path: string;
    name: string;
}

export type ISidebarItemDropDown = {
    type: sidebarItemType.ISidebarItemDropDown
    name: string;
    elements: Array<DropDownElement>
}

export type ISidebarItem = ISidebarItemBasic | ISidebarItemDropDown