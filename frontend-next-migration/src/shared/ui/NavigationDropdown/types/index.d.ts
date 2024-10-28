type Link = {
    isExternal: boolean;
    path: string;
};

export type MenuItem = {
    id: string;
    elementText: string;
    link?: Link;
    isDisabled?: {
        status: boolean;
        reason: string;
    };
    children?: MenuItem[];
};
