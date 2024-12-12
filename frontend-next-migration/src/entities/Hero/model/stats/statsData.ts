import { HeroSlug } from '../../types/hero';
import { HeroStats, HeroLevel } from '../../types/HeroStats';

export const statsData: Record<HeroSlug, Record<HeroLevel, HeroStats>> = {
    [HeroSlug.HANNU_HODARI]: {
        1: {
            attack: [{ statLevel: 1, value: 10, cost: 50, upgradePotential: 2 }],
            defense: [{ statLevel: 1, value: 5, cost: 40, upgradePotential: 2 }],
            speed: [{ statLevel: 1, value: 7, cost: 45, upgradePotential: 2 }],
        },
        2: {
            attack: [
                { statLevel: 1, value: 12, cost: 75, upgradePotential: 2 },
                { statLevel: 2, value: 14, cost: 100, upgradePotential: 2 },
            ],
            defense: [
                { statLevel: 1, value: 6, cost: 60, upgradePotential: 2 },
                { statLevel: 2, value: 7, cost: 90, upgradePotential: 2 },
            ],
            speed: [
                { statLevel: 1, value: 8, cost: 70, upgradePotential: 2 },
                { statLevel: 2, value: 9, cost: 95, upgradePotential: 2 },
            ],
        },
        3: {
            attack: [
                { statLevel: 1, value: 14, cost: 100, upgradePotential: 3 },
                { statLevel: 2, value: 16, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 7, cost: 80, upgradePotential: 3 },
                { statLevel: 2, value: 8, cost: 110, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 9, cost: 95, upgradePotential: 3 },
                { statLevel: 2, value: 10, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
        },
        4: {
            attack: [
                { statLevel: 1, value: 16, cost: 125, upgradePotential: 4 },
                { statLevel: 2, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 3, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 4, value: 18, cost: 150, upgradePotential: 4 },
            ],
            defense: [
                { statLevel: 1, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 2, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 3, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 4, value: 9, cost: 130, upgradePotential: 4 },
            ],
            speed: [
                { statLevel: 1, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 2, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 3, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 4, value: 11, cost: 150, upgradePotential: 4 },
            ],
        },
    },

    [HeroSlug.GRAFFITI_ARTIST]: {
        1: {
            attack: [{ statLevel: 1, value: 10, cost: 50, upgradePotential: 2 }],
            defense: [{ statLevel: 1, value: 5, cost: 40, upgradePotential: 2 }],
            speed: [{ statLevel: 1, value: 7, cost: 45, upgradePotential: 2 }],
        },
        2: {
            attack: [
                { statLevel: 1, value: 12, cost: 75, upgradePotential: 2 },
                { statLevel: 2, value: 14, cost: 100, upgradePotential: 2 },
            ],
            defense: [
                { statLevel: 1, value: 6, cost: 60, upgradePotential: 2 },
                { statLevel: 2, value: 7, cost: 90, upgradePotential: 2 },
            ],
            speed: [
                { statLevel: 1, value: 8, cost: 70, upgradePotential: 2 },
                { statLevel: 2, value: 9, cost: 95, upgradePotential: 2 },
            ],
        },
        3: {
            attack: [
                { statLevel: 1, value: 14, cost: 100, upgradePotential: 3 },
                { statLevel: 2, value: 16, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 7, cost: 80, upgradePotential: 3 },
                { statLevel: 2, value: 8, cost: 110, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 9, cost: 95, upgradePotential: 3 },
                { statLevel: 2, value: 10, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
        },
        4: {
            attack: [
                { statLevel: 1, value: 16, cost: 125, upgradePotential: 4 },
                { statLevel: 2, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 3, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 4, value: 18, cost: 150, upgradePotential: 4 },
            ],
            defense: [
                { statLevel: 1, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 2, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 3, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 4, value: 9, cost: 130, upgradePotential: 4 },
            ],
            speed: [
                { statLevel: 1, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 2, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 3, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 4, value: 11, cost: 150, upgradePotential: 4 },
            ],
        },
    },
    [HeroSlug.RESEARCHER]: {
        1: {
            attack: [{ statLevel: 1, value: 10, cost: 50, upgradePotential: 2 }],
            defense: [{ statLevel: 1, value: 5, cost: 40, upgradePotential: 2 }],
            speed: [{ statLevel: 1, value: 7, cost: 45, upgradePotential: 2 }],
        },
        2: {
            attack: [
                { statLevel: 1, value: 12, cost: 75, upgradePotential: 2 },
                { statLevel: 2, value: 14, cost: 100, upgradePotential: 2 },
            ],
            defense: [
                { statLevel: 1, value: 6, cost: 60, upgradePotential: 2 },
                { statLevel: 2, value: 7, cost: 90, upgradePotential: 2 },
            ],
            speed: [
                { statLevel: 1, value: 8, cost: 70, upgradePotential: 2 },
                { statLevel: 2, value: 9, cost: 95, upgradePotential: 2 },
            ],
        },
        3: {
            attack: [
                { statLevel: 1, value: 14, cost: 100, upgradePotential: 3 },
                { statLevel: 2, value: 16, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 7, cost: 80, upgradePotential: 3 },
                { statLevel: 2, value: 8, cost: 110, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 9, cost: 95, upgradePotential: 3 },
                { statLevel: 2, value: 10, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
        },
        4: {
            attack: [
                { statLevel: 1, value: 16, cost: 125, upgradePotential: 4 },
                { statLevel: 2, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 3, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 4, value: 18, cost: 150, upgradePotential: 4 },
            ],
            defense: [
                { statLevel: 1, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 2, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 3, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 4, value: 9, cost: 130, upgradePotential: 4 },
            ],
            speed: [
                { statLevel: 1, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 2, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 3, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 4, value: 11, cost: 150, upgradePotential: 4 },
            ],
        },
    },
    [HeroSlug.CONMAN]: {
        1: {
            attack: [{ statLevel: 1, value: 10, cost: 50, upgradePotential: 2 }],
            defense: [{ statLevel: 1, value: 5, cost: 40, upgradePotential: 2 }],
            speed: [{ statLevel: 1, value: 7, cost: 45, upgradePotential: 2 }],
        },
        2: {
            attack: [
                { statLevel: 1, value: 12, cost: 75, upgradePotential: 2 },
                { statLevel: 2, value: 14, cost: 100, upgradePotential: 2 },
            ],
            defense: [
                { statLevel: 1, value: 6, cost: 60, upgradePotential: 2 },
                { statLevel: 2, value: 7, cost: 90, upgradePotential: 2 },
            ],
            speed: [
                { statLevel: 1, value: 8, cost: 70, upgradePotential: 2 },
                { statLevel: 2, value: 9, cost: 95, upgradePotential: 2 },
            ],
        },
        3: {
            attack: [
                { statLevel: 1, value: 14, cost: 100, upgradePotential: 3 },
                { statLevel: 2, value: 16, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 7, cost: 80, upgradePotential: 3 },
                { statLevel: 2, value: 8, cost: 110, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 9, cost: 95, upgradePotential: 3 },
                { statLevel: 2, value: 10, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
        },
        4: {
            attack: [
                { statLevel: 1, value: 16, cost: 125, upgradePotential: 4 },
                { statLevel: 2, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 3, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 4, value: 18, cost: 150, upgradePotential: 4 },
            ],
            defense: [
                { statLevel: 1, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 2, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 3, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 4, value: 9, cost: 130, upgradePotential: 4 },
            ],
            speed: [
                { statLevel: 1, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 2, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 3, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 4, value: 11, cost: 150, upgradePotential: 4 },
            ],
        },
    },
    [HeroSlug.SLEEPER]: {
        1: {
            attack: [{ statLevel: 1, value: 10, cost: 50, upgradePotential: 2 }],
            defense: [{ statLevel: 1, value: 5, cost: 40, upgradePotential: 2 }],
            speed: [{ statLevel: 1, value: 7, cost: 45, upgradePotential: 2 }],
        },
        2: {
            attack: [
                { statLevel: 1, value: 12, cost: 75, upgradePotential: 2 },
                { statLevel: 2, value: 14, cost: 100, upgradePotential: 2 },
            ],
            defense: [
                { statLevel: 1, value: 6, cost: 60, upgradePotential: 2 },
                { statLevel: 2, value: 7, cost: 90, upgradePotential: 2 },
            ],
            speed: [
                { statLevel: 1, value: 8, cost: 70, upgradePotential: 2 },
                { statLevel: 2, value: 9, cost: 95, upgradePotential: 2 },
            ],
        },
        3: {
            attack: [
                { statLevel: 1, value: 14, cost: 100, upgradePotential: 3 },
                { statLevel: 2, value: 16, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 7, cost: 80, upgradePotential: 3 },
                { statLevel: 2, value: 8, cost: 110, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 9, cost: 95, upgradePotential: 3 },
                { statLevel: 2, value: 10, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
        },
        4: {
            attack: [
                { statLevel: 1, value: 16, cost: 125, upgradePotential: 4 },
                { statLevel: 2, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 3, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 4, value: 18, cost: 150, upgradePotential: 4 },
            ],
            defense: [
                { statLevel: 1, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 2, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 3, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 4, value: 9, cost: 130, upgradePotential: 4 },
            ],
            speed: [
                { statLevel: 1, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 2, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 3, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 4, value: 11, cost: 150, upgradePotential: 4 },
            ],
        },
    },
    [HeroSlug.FATE_PRIEST]: {
        1: {
            attack: [{ statLevel: 1, value: 10, cost: 50, upgradePotential: 2 }],
            defense: [{ statLevel: 1, value: 5, cost: 40, upgradePotential: 2 }],
            speed: [{ statLevel: 1, value: 7, cost: 45, upgradePotential: 2 }],
        },
        2: {
            attack: [
                { statLevel: 1, value: 12, cost: 75, upgradePotential: 2 },
                { statLevel: 2, value: 14, cost: 100, upgradePotential: 2 },
            ],
            defense: [
                { statLevel: 1, value: 6, cost: 60, upgradePotential: 2 },
                { statLevel: 2, value: 7, cost: 90, upgradePotential: 2 },
            ],
            speed: [
                { statLevel: 1, value: 8, cost: 70, upgradePotential: 2 },
                { statLevel: 2, value: 9, cost: 95, upgradePotential: 2 },
            ],
        },
        3: {
            attack: [
                { statLevel: 1, value: 14, cost: 100, upgradePotential: 3 },
                { statLevel: 2, value: 16, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 7, cost: 80, upgradePotential: 3 },
                { statLevel: 2, value: 8, cost: 110, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 9, cost: 95, upgradePotential: 3 },
                { statLevel: 2, value: 10, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
        },
        4: {
            attack: [
                { statLevel: 1, value: 16, cost: 125, upgradePotential: 4 },
                { statLevel: 2, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 3, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 4, value: 18, cost: 150, upgradePotential: 4 },
            ],
            defense: [
                { statLevel: 1, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 2, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 3, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 4, value: 9, cost: 130, upgradePotential: 4 },
            ],
            speed: [
                { statLevel: 1, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 2, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 3, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 4, value: 11, cost: 150, upgradePotential: 4 },
            ],
        },
    },
    [HeroSlug.SOUL_SISTERS]: {
        1: {
            attack: [{ statLevel: 1, value: 10, cost: 50, upgradePotential: 2 }],
            defense: [{ statLevel: 1, value: 5, cost: 40, upgradePotential: 2 }],
            speed: [{ statLevel: 1, value: 7, cost: 45, upgradePotential: 2 }],
        },
        2: {
            attack: [
                { statLevel: 1, value: 12, cost: 75, upgradePotential: 2 },
                { statLevel: 2, value: 14, cost: 100, upgradePotential: 2 },
            ],
            defense: [
                { statLevel: 1, value: 6, cost: 60, upgradePotential: 2 },
                { statLevel: 2, value: 7, cost: 90, upgradePotential: 2 },
            ],
            speed: [
                { statLevel: 1, value: 8, cost: 70, upgradePotential: 2 },
                { statLevel: 2, value: 9, cost: 95, upgradePotential: 2 },
            ],
        },
        3: {
            attack: [
                { statLevel: 1, value: 14, cost: 100, upgradePotential: 3 },
                { statLevel: 2, value: 16, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 7, cost: 80, upgradePotential: 3 },
                { statLevel: 2, value: 8, cost: 110, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 9, cost: 95, upgradePotential: 3 },
                { statLevel: 2, value: 10, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
        },
        4: {
            attack: [
                { statLevel: 1, value: 16, cost: 125, upgradePotential: 4 },
                { statLevel: 2, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 3, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 4, value: 18, cost: 150, upgradePotential: 4 },
            ],
            defense: [
                { statLevel: 1, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 2, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 3, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 4, value: 9, cost: 130, upgradePotential: 4 },
            ],
            speed: [
                { statLevel: 1, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 2, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 3, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 4, value: 11, cost: 150, upgradePotential: 4 },
            ],
        },
    },
    [HeroSlug.PIRATE]: {
        1: {
            attack: [{ statLevel: 1, value: 10, cost: 50, upgradePotential: 2 }],
            defense: [{ statLevel: 1, value: 5, cost: 40, upgradePotential: 2 }],
            speed: [{ statLevel: 1, value: 7, cost: 45, upgradePotential: 2 }],
        },
        2: {
            attack: [
                { statLevel: 1, value: 12, cost: 75, upgradePotential: 2 },
                { statLevel: 2, value: 14, cost: 100, upgradePotential: 2 },
            ],
            defense: [
                { statLevel: 1, value: 6, cost: 60, upgradePotential: 2 },
                { statLevel: 2, value: 7, cost: 90, upgradePotential: 2 },
            ],
            speed: [
                { statLevel: 1, value: 8, cost: 70, upgradePotential: 2 },
                { statLevel: 2, value: 9, cost: 95, upgradePotential: 2 },
            ],
        },
        3: {
            attack: [
                { statLevel: 1, value: 14, cost: 100, upgradePotential: 3 },
                { statLevel: 2, value: 16, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 7, cost: 80, upgradePotential: 3 },
                { statLevel: 2, value: 8, cost: 110, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 9, cost: 95, upgradePotential: 3 },
                { statLevel: 2, value: 10, cost: 125, upgradePotential: 3 },
                { statLevel: 3, value: 16, cost: 225, upgradePotential: 3 },
            ],
        },
        4: {
            attack: [
                { statLevel: 1, value: 16, cost: 125, upgradePotential: 4 },
                { statLevel: 2, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 3, value: 18, cost: 150, upgradePotential: 4 },
                { statLevel: 4, value: 18, cost: 150, upgradePotential: 4 },
            ],
            defense: [
                { statLevel: 1, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 2, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 3, value: 8, cost: 100, upgradePotential: 4 },
                { statLevel: 4, value: 9, cost: 130, upgradePotential: 4 },
            ],
            speed: [
                { statLevel: 1, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 2, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 3, value: 10, cost: 120, upgradePotential: 4 },
                { statLevel: 4, value: 11, cost: 150, upgradePotential: 4 },
            ],
        },
    },
};
