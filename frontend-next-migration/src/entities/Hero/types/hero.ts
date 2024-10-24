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
    // groupTextBg: string;
    // color: string;
}

export interface GroupInfo {
    name: string;
    description: string;
    bgColour: string;
    heroes: Hero[];
}
