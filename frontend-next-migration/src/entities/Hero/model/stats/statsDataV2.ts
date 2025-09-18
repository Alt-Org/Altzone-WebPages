import { Stat } from '../../types/hero';

export const color = {
    resistance: 'rgb(153,0,255)',
    hp: 'rgb(0,255,0)',
    size: 'rgb(224,102,102)',
    impactForce: 'rgb(255,153,0)',
    speed: 'rgb(0,255,255)',
};

const rangeByStep = (start: number, step: number, count: number): number[] =>
    Array.from({ length: count }, (_, i) => start + i * step);

const repeatSeq = (pairs: Array<[number, number]>): number[] =>
    pairs.flatMap(([val, times]) => Array(times).fill(val));

const sizeSpeedSeq = repeatSeq([
    [4, 3],
    [6, 3],
    [8, 4],
    [10, 4],
    [12, 4],
    [14, 3],
    [16, 3],
]);

export const statValue = {
    resistance: rangeByStep(50, 25, 24),
    hp: rangeByStep(50, 25, 24),
    size: sizeSpeedSeq,
    impactForce: [5, ...rangeByStep(10, 10, 23)],
    speed: sizeSpeedSeq,
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

type NamedStatArray = Record<string, Stat[]>;

const mkStat = (name: Stat['name'], defaultLevel: number, rarityClass: number): Stat => ({
    name,
    defaultLevel,
    rarityClass,
});

export const statData: NamedStatArray = {
    OVEREATER: [
        mkStat('resistance', 5, 3),
        mkStat('hp', 2, 3),
        mkStat('size', 12, 1),
        mkStat('impactForce', 8, 3),
        mkStat('speed', 8, 3),
    ],
    ALCOHOLIC: [
        mkStat('resistance', 8, 3),
        mkStat('hp', 1, 3),
        mkStat('size', 10, 1),
        mkStat('impactForce', 9, 3),
        mkStat('speed', 8, 3),
    ],
    SOUL_SISTERS: [
        mkStat('resistance', 11, 3),
        mkStat('hp', 2, 8),
        mkStat('size', 12, 3),
        mkStat('impactForce', 2, 10),
        mkStat('speed', 2, 10),
    ],
    SLEEPY_SLEEPER: [
        mkStat('resistance', 12, 3),
        mkStat('hp', 3, 8),
        mkStat('size', 10, 3),
        mkStat('impactForce', 1, 10),
        mkStat('speed', 4, 10),
    ],
    PROVOCATEUR: [
        mkStat('resistance', 10, 5),
        mkStat('hp', 3, 7),
        mkStat('size', 8, 7),
        mkStat('impactForce', 7, 7),
        mkStat('speed', 4, 5),
    ],
    MIRROR: [
        mkStat('resistance', 10, 5),
        mkStat('hp', 3, 7),
        mkStat('size', 8, 7),
        mkStat('impactForce', 7, 7),
        mkStat('speed', 4, 5),
    ],
    RESEARCHER: [
        mkStat('resistance', 3, 7),
        mkStat('hp', 8, 5),
        mkStat('size', 8, 8),
        mkStat('impactForce', 10, 10),
        mkStat('speed', 6, 7),
    ],
    CONMAN: [
        mkStat('resistance', 5, 8),
        mkStat('hp', 2, 3),
        mkStat('size', 6, 10),
        mkStat('impactForce', 7, 7),
        mkStat('speed', 10, 8),
    ],
    JOKESTER: [
        mkStat('resistance', 5, 8),
        mkStat('hp', 2, 3),
        mkStat('size', 6, 10),
        mkStat('impactForce', 7, 7),
        mkStat('speed', 10, 8),
    ],
    BELIEVER: [
        mkStat('resistance', 10, 3),
        mkStat('hp', 10, 3),
        mkStat('size', 10, 1),
        mkStat('impactForce', 10, 3),
        mkStat('speed', 10, 3),
    ],
    HATE_SPEECH: [
        mkStat('resistance', 14, 1),
        mkStat('hp', 1, 10),
        mkStat('size', 8, 5),
        mkStat('impactForce', 6, 3),
        mkStat('speed', 3, 8),
    ],
    MEATWALL: [
        mkStat('resistance', 14, 1),
        mkStat('hp', 1, 10),
        mkStat('size', 8, 5),
        mkStat('impactForce', 6, 3),
        mkStat('speed', 3, 8),
    ],
    VETERAN: [
        mkStat('resistance', 14, 1),
        mkStat('hp', 1, 10),
        mkStat('size', 8, 5),
        mkStat('impactForce', 6, 3),
        mkStat('speed', 3, 8),
    ],
};
