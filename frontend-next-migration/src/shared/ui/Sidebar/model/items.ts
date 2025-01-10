import { DropDownElement } from '@/shared/ui/DropdownWrapper';

export enum sidebarItemType {
    ISidebarItemBasic = 'ISidebarItemBasic',
    ISidebarItemDropDown = 'ISidebarItemDropDown',
}

export type ISidebarItemBasic = {
    type: sidebarItemType.ISidebarItemBasic;
    path: string;
    name: string;
    active?: boolean;
};

export type ISidebarItemDropDown = {
    type: sidebarItemType.ISidebarItemDropDown;
    name: string;
    elements: Array<DropDownElement>;
    active?: boolean;
};

export type ISidebarItem = ISidebarItemBasic | ISidebarItemDropDown;
