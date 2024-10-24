import { StaticImageData } from 'next/image';

export enum HeroGroup {
    RETROFLECTOR = 'RETROFLECTOR',
    // DESENSITIZER = "DESENSITIZER",
    // TRICKSTER = "TRICKSTER",
    // OBEDIENT = "OBEDIENT",
    PROJECTOR = 'PROJECTOR',
    //
    // // PROFLECTOR = "PROFLECTOR",
    // INTELLECTUALIZER = "INTELLECTUALIZER",
    // CONFLUENT = "CONFLUENT"
}

export enum HeroSlug {}

export interface Hero {
    id: number;
    srcImg: StaticImageData;
    srcGif: StaticImageData;
    alt: string;
    title: string;
    description: string;
    slug: string;
    // groupTextBg: string;
    // color: string;
}

export interface GroupInfo {
    name: string;
    description: string;
    bgColour: string;
    heroes: Hero[];
}
