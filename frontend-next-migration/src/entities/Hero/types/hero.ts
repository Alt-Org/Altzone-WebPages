import { StaticImageData } from 'next/image';

export enum HeroGroup {
    RETROFLECTOR = 'RETROFLECTOR',
    // DESENSITIZER = "DESENSITIZER",
    TRICKSTER = 'TRICKSTER',
    // OBEDIENT = "OBEDIENT",
    PROJECTOR = 'PROJECTOR',
    // // PROFLECTOR = "PROFLECTOR",
    INTELLECTUALIZER = 'INTELLECTUALIZER',
    CONFLUENT = 'CONFLUENT',
}

export enum HeroSlug {
    HANNU_HODARI = 'hannu-hodari',
    GRAFFITI_ARTIST = 'graffiti-artist',
    RESEARCHER = 'researcher',
    PIRATE = 'pirate',
    SOUL_SISTERS = 'soul-sisters',
    CONMAN = 'conman',
}

export interface Hero {
    id: number;
    srcImg: StaticImageData | string;
    srcGif: StaticImageData | string;
    alt: string;
    altGif: string;
    title: string;
    description: string;
    slug: HeroSlug;
}

export interface GroupInfo {
    name: string;
    description: string;
    bgColour: string;
    label: StaticImageData | string;
    heroes: Hero[];
}

export interface HeroWithGroup extends Hero {
    groupEnum: HeroGroup;
    groupName: string;
    groupDescription: string;
    groupBgColour: string;
    groupLabel: StaticImageData | string;
}
