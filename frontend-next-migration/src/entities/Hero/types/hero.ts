import { StaticImageData } from 'next/image';

export enum HeroGroup {
    RETROFLECTOR = 'RETROFLECTOR',
    DESENSITIZER = 'DESENSITIZER',
    TRICKSTER = 'TRICKSTER',
    OBEDIENT = 'OBEDIENT',
    PROJECTOR = 'PROJECTOR',
    // // PROFLECTOR = "PROFLECTOR",
    INTELLECTUALIZER = 'INTELLECTUALIZER',
    CONFLUENT = 'CONFLUENT',
}

export enum HeroSlug {
    OVEREATER = 'overeater',
    PROVOCATEUR = 'provocateur',
    MIRROR = 'mirror',
    RESEARCHER = 'researcher',
    ALCOHOLIC = 'alcoholic',
    SOUL_SISTERS = 'soul-sisters',
    CONMAN = 'conman',
    JOKESTER = 'jokester',
    SLEEPY_SLEEPER = 'sleepy-sleeper',
    BELIEVER = 'believer',
    HATE_SPEECH = 'hate-speech',
    MEATWALL = 'meatwall',
    VETERAN = 'war-veteran',
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
    stats: Stat[];
}

export type StatName = 'resistance' | 'hp' | 'size' | 'impactForce' | 'speed';

export type Stat = {
    name: StatName;
    rarityClass: number;
    defaultLevel: number;
    developmentLevel?: number;
    color?: string;
};

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
