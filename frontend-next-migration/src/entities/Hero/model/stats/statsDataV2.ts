import { Stat } from '../../types/hero';

export const color = {
    resistance: 'rgb(153,0,255)',
    hp: 'rgb(0,255,0)',
    size: 'rgb(224,102,102)',
    impactForce: 'rgb(255,153,0)',
    speed: 'rgb(0,255,255)',
};
export const statValue = {
    resistance: [
        50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500,
        525, 550, 575, 600, 625,
    ],
    hp: [
        50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500,
        525, 550, 575, 600, 625,
    ],
    size: [4, 4, 4, 6, 6, 6, 8, 8, 8, 8, 10, 10, 10, 10, 12, 12, 12, 12, 14, 14, 14, 16, 16, 16],
    impactForce: [
        5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190,
        200, 210, 220, 230,
    ],
    speed: [4, 4, 4, 6, 6, 6, 8, 8, 8, 8, 10, 10, 10, 10, 12, 12, 12, 12, 14, 14, 14, 16, 16, 16],
};

type RarityClass = {
    [key: number]: string;
};

export const rarityClassNames: RarityClass = {
    1: 'veryStrongSkill',
    3: 'strongSkill',
    5: 'fairlyStrongSkill',
    6: 'intermediate',
    7: 'ratherWeakSkill',
    8: 'weakSkill',
    10: 'veryWeakSkill',
};

type NamedStatArray = {
    [key: string]: Stat[];
};

export const statData: NamedStatArray = {
    HANNU_HODARI: [
        {
            name: 'resistance',
            defaultLevel: 5,
            rarityClass: 3,
        },
        {
            name: 'hp',
            defaultLevel: 2,
            rarityClass: 3,
        },
        {
            name: 'size',
            defaultLevel: 12,
            rarityClass: 1,
        },
        {
            name: 'impactForce',
            defaultLevel: 8,
            rarityClass: 3,
        },
        {
            name: 'speed',
            defaultLevel: 8,
            rarityClass: 3,
        },
    ],
    PIRATE: [
        {
            name: 'resistance',
            defaultLevel: 8,
            rarityClass: 3,
        },
        {
            name: 'hp',
            defaultLevel: 1,
            rarityClass: 3,
        },
        {
            name: 'size',
            defaultLevel: 10,
            rarityClass: 1,
        },
        {
            name: 'impactForce',
            defaultLevel: 9,
            rarityClass: 3,
        },
        {
            name: 'speed',
            defaultLevel: 8,
            rarityClass: 3,
        },
    ],
    SOUL_SISTERS: [
        {
            name: 'resistance',
            defaultLevel: 11,
            rarityClass: 3,
        },
        {
            name: 'hp',
            defaultLevel: 2,
            rarityClass: 8,
        },
        {
            name: 'size',
            defaultLevel: 12,
            rarityClass: 3,
        },
        {
            name: 'impactForce',
            defaultLevel: 2,
            rarityClass: 10,
        },
        {
            name: 'speed',
            defaultLevel: 2,
            rarityClass: 10,
        },
    ],
    SLEEPER: [
        {
            name: 'resistance',
            defaultLevel: 12,
            rarityClass: 3,
        },
        {
            name: 'hp',
            defaultLevel: 3,
            rarityClass: 8,
        },
        {
            name: 'size',
            defaultLevel: 10,
            rarityClass: 3,
        },
        {
            name: 'impactForce',
            defaultLevel: 1,
            rarityClass: 10,
        },
        {
            name: 'speed',
            defaultLevel: 4,
            rarityClass: 10,
        },
    ],
    GRAFFITI_ARTIST: [
        {
            name: 'resistance',
            defaultLevel: 10,
            rarityClass: 5,
        },
        {
            name: 'hp',
            defaultLevel: 3,
            rarityClass: 7,
        },
        {
            name: 'size',
            defaultLevel: 8,
            rarityClass: 7,
        },
        {
            name: 'impactForce',
            defaultLevel: 7,
            rarityClass: 7,
        },
        {
            name: 'speed',
            defaultLevel: 4,
            rarityClass: 5,
        },
    ],
    RESEARCHER: [
        {
            name: 'resistance',
            defaultLevel: 3,
            rarityClass: 7,
        },
        {
            name: 'hp',
            defaultLevel: 8,
            rarityClass: 5,
        },
        {
            name: 'size',
            defaultLevel: 8,
            rarityClass: 8,
        },
        {
            name: 'impactForce',
            defaultLevel: 10,
            rarityClass: 10,
        },
        {
            name: 'speed',
            defaultLevel: 6,
            rarityClass: 7,
        },
    ],
    CONMAN: [
        {
            name: 'resistance',
            defaultLevel: 5,
            rarityClass: 8,
        },
        {
            name: 'hp',
            defaultLevel: 2,
            rarityClass: 3,
        },
        {
            name: 'size',
            defaultLevel: 6,
            rarityClass: 10,
        },
        {
            name: 'impactForce',
            defaultLevel: 7,
            rarityClass: 7,
        },
        {
            name: 'speed',
            defaultLevel: 10,
            rarityClass: 8,
        },
    ],
    FATE_PRIEST: [
        {
            name: 'resistance',
            defaultLevel: 10,
            rarityClass: 3,
        },
        {
            name: 'hp',
            defaultLevel: 10,
            rarityClass: 3,
        },
        {
            name: 'size',
            defaultLevel: 10,
            rarityClass: 1,
        },
        {
            name: 'impactForce',
            defaultLevel: 10,
            rarityClass: 3,
        },
        {
            name: 'speed',
            defaultLevel: 10,
            rarityClass: 3,
        },
    ],
};
