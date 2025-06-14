import { ReactNode } from 'react';
import { CustomSwitchItems } from '../enum/CustomSwitch.enum';

export type ToggleItem = {
    type: CustomSwitchItems.ToggleItem;
    isOpen: boolean;
    onOpen: () => void;
    className?: string;
    children: ReactNode;
};

export type ToggleLink = {
    type: CustomSwitchItems.ToggleLink;
    isOpen: boolean;
    path: string;
    className?: string;
    children: ReactNode;
};
