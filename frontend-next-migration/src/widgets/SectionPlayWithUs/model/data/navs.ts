import {NavItem} from "../types/types";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";

export const Navs: NavItem[] = [
    
    {
        title: 'seeOpenPositions',
        body: 'comeWith',
        link: AppExternalLinks.duunitori,
        isExternal: true
    },
    {
        title: 'becomeATester',
        body: 'makeTheAppBetter',
        link: AppExternalLinks.discord,
        isExternal: true
    },
]

export const MockNavs: NavItem[] = [
    
    {
        title: 'Katso avoimet paikat',
        body: 'Tule mukaan',
        link: AppExternalLinks.stub,
        isExternal: false
    },
    {
        title: 'Tule testaajaksi',
        body: 'Tee sovelluksesta parempi',
        link: AppExternalLinks.stub,
        isExternal: false
    },
]