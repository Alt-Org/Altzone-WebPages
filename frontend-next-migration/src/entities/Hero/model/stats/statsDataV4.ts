import { Stat } from '../../types/hero';

type NamedStatArray = {
    [key: string]: Stat[];
};

export const statData3: NamedStatArray = {
    SEDUCER: [
        {
            name: 'resistance',
            defaultLevel: 8,
            rarityClass: 8,
        },
        {
            name: 'hp',
            defaultLevel: 5,
            rarityClass: 3,
        },
        {
            name: 'size',
            defaultLevel: 8,
            rarityClass: 10,
        },
        {
            name: 'impactForce',
            defaultLevel: 5,
            rarityClass: 7,
        },
        {
            name: 'speed',
            defaultLevel: 6,
            rarityClass: 8,
        },
    ],
    PEOPLE_PLEASER: [
        {
            name: 'resistance',
            defaultLevel: 8,
            rarityClass: 8,
        },
        {
            name: 'hp',
            defaultLevel: 12,
            rarityClass: 10,
        },
        {
            name: 'size',
            defaultLevel: 6,
            rarityClass: 10,
        },
        {
            name: 'impactForce',
            defaultLevel: 14,
            rarityClass: 7,
        },
        {
            name: 'speed',
            defaultLevel: 8,
            rarityClass: 8,
        },
    ],
    BULLYING: [
        {
            name: 'resistance',
            defaultLevel: 14,
            rarityClass: 1,
        },
        {
            name: 'hp',
            defaultLevel: 1,
            rarityClass: 10,
        },
        {
            name: 'size',
            defaultLevel: 6,
            rarityClass: 5,
        },
        {
            name: 'impactForce',
            defaultLevel: 6,
            rarityClass: 3,
        },
        {
            name: 'speed',
            defaultLevel: 5,
            rarityClass: 8,
        },
    ],
};
