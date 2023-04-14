import {NavItem} from "../types/types";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";

export const Navs: NavItem[] = [
    {
        title: 'Tutustu projektiin',
        body: 'Lue lisää',
        link: AppExternalLinks.stub,
        isExternal: false
    },
    {
        title: 'Katso avoimet paikat',
        body: 'Tule mukaan',
        link: AppExternalLinks.duunitori,
        isExternal: true
    },
    {
        title: 'Tule testaajaksi',
        body: 'Tee sovelluksesta parempi',
        link: AppExternalLinks.discord,
        isExternal: true
    },
]

export const MockNavs: NavItem[] = [
    {
        title: 'Tutustu projektiin',
        body: 'Lue lisää',
        link: AppExternalLinks.stub,
        isExternal: false
    },
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