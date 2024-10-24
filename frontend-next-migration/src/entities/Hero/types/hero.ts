import { StaticImageData } from 'next/image';

export enum HeroGroup {
    RETROFLECTOR = 'RETROFLECTOR',
    // DESENSITIZER = "DESENSITIZER",
    // TRICKSTER = "TRICKSTER",
    // OBEDIENT = "OBEDIENT",
    PROJECTOR = 'PROJECTOR',
    //
    // // PROFLECTOR = "PROFLECTOR",
    INTELLECTUALIZER = 'INTELLECTUALIZER',
    // CONFLUENT = "CONFLUENT"
}

export enum HeroSlug {
    HANNU_HODARI = 'hannu-hodari',
    GRAFFITI_ARTIST = 'graffiti-artist',
    RESEARCHER = 'researcher',
}

export interface Hero {
    id: number;
    srcImg: StaticImageData;
    srcGif: StaticImageData;
    alt: string;
    title: string;
    description: string;
    slug: HeroSlug;
}

export interface GroupInfo {
    name: string;
    description: string;
    bgColour: string;
    label: StaticImageData;
    heroes: Hero[];
}

export interface HeroWithGroup extends Hero {
    groupEnum: HeroGroup;
    groupName: string;
    groupDescription: string;
    groupBgColour: string;
    groupLabel: StaticImageData;
}
