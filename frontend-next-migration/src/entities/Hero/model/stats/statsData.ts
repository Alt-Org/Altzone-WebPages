import { HeroSlug } from '../../types/hero';
import { HeroStats, HeroLevel } from '../../types/HeroStats';

export const statsData: Record<HeroSlug, Record<HeroLevel, HeroStats>> = {
    [HeroSlug.HANNU_HODARI]: {
        1: {
            attack: [
                { statLevel: 1, value: 10, cost: 50, upgradePotential: 3 },
                { statLevel: 2, value: 12, cost: 75, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 5, cost: 40, upgradePotential: 3 },
                { statLevel: 2, value: 6, cost: 60, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 7, cost: 45, upgradePotential: 3 },
                { statLevel: 2, value: 8, cost: 70, upgradePotential: 3 },
            ],
        },
        2: {
            attack: [
                { statLevel: 1, value: 12, cost: 75, upgradePotential: 22 },
                { statLevel: 2, value: 14, cost: 100, upgradePotential: 5 },
            ],
            defense: [
                { statLevel: 1, value: 6, cost: 60, upgradePotential: 5 },
                { statLevel: 2, value: 7, cost: 90, upgradePotential: 5 },
            ],
            speed: [
                { statLevel: 1, value: 8, cost: 70, upgradePotential: 5 },
                { statLevel: 2, value: 9, cost: 95, upgradePotential: 5 },
            ],
        },
    },
    [HeroSlug.GRAFFITI_ARTIST]: {
        1: {
            attack: [
                { statLevel: 1, value: 8, cost: 40, upgradePotential: 3 },
                { statLevel: 2, value: 10, cost: 60, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 6, cost: 30, upgradePotential: 3 },
                { statLevel: 2, value: 7, cost: 50, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 9, cost: 35, upgradePotential: 3 },
                { statLevel: 2, value: 11, cost: 55, upgradePotential: 3 },
            ],
        },
        2: {
            attack: [
                { statLevel: 1, value: 10, cost: 60, upgradePotential: 5 },
                { statLevel: 2, value: 12, cost: 85, upgradePotential: 5 },
            ],
            defense: [
                { statLevel: 1, value: 7, cost: 50, upgradePotential: 5 },
                { statLevel: 2, value: 8, cost: 75, upgradePotential: 5 },
            ],
            speed: [
                { statLevel: 1, value: 11, cost: 55, upgradePotential: 5 },
                { statLevel: 2, value: 13, cost: 80, upgradePotential: 5 },
            ],
        },
    },
    [HeroSlug.RESEARCHER]: {
        1: {
            attack: [
                { statLevel: 1, value: 6, cost: 30, upgradePotential: 3 },
                { statLevel: 2, value: 8, cost: 50, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 4, cost: 25, upgradePotential: 3 },
                { statLevel: 2, value: 5, cost: 40, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 5, cost: 35, upgradePotential: 3 },
                { statLevel: 2, value: 7, cost: 50, upgradePotential: 3 },
            ],
        },
        2: {
            attack: [
                { statLevel: 1, value: 8, cost: 50, upgradePotential: 5 },
                { statLevel: 2, value: 10, cost: 75, upgradePotential: 5 },
            ],
            defense: [
                { statLevel: 1, value: 5, cost: 40, upgradePotential: 5 },
                { statLevel: 2, value: 7, cost: 60, upgradePotential: 5 },
            ],
            speed: [
                { statLevel: 1, value: 7, cost: 50, upgradePotential: 5 },
                { statLevel: 2, value: 9, cost: 70, upgradePotential: 5 },
            ],
        },
    },
    [HeroSlug.CONMAN]: {
        1: {
            attack: [
                { statLevel: 1, value: 12, cost: 50, upgradePotential: 3 },
                { statLevel: 2, value: 14, cost: 75, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 6, cost: 40, upgradePotential: 3 },
                { statLevel: 2, value: 8, cost: 60, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 7, cost: 45, upgradePotential: 3 },
                { statLevel: 2, value: 9, cost: 70, upgradePotential: 3 },
            ],
        },
        2: {
            attack: [
                { statLevel: 1, value: 14, cost: 75, upgradePotential: 5 },
                { statLevel: 2, value: 16, cost: 100, upgradePotential: 5 },
            ],
            defense: [
                { statLevel: 1, value: 8, cost: 60, upgradePotential: 5 },
                { statLevel: 2, value: 10, cost: 90, upgradePotential: 5 },
            ],
            speed: [
                { statLevel: 1, value: 9, cost: 70, upgradePotential: 5 },
                { statLevel: 2, value: 11, cost: 95, upgradePotential: 5 },
            ],
        },
    },
    [HeroSlug.SLEEPER]: {
        1: {
            attack: [
                { statLevel: 1, value: 7, cost: 35, upgradePotential: 3 },
                { statLevel: 2, value: 9, cost: 55, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 5, cost: 30, upgradePotential: 3 },
                { statLevel: 2, value: 6, cost: 45, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 8, cost: 40, upgradePotential: 3 },
                { statLevel: 2, value: 10, cost: 60, upgradePotential: 3 },
            ],
        },
        2: {
            attack: [
                { statLevel: 1, value: 9, cost: 55, upgradePotential: 5 },
                { statLevel: 2, value: 11, cost: 75, upgradePotential: 5 },
            ],
            defense: [
                { statLevel: 1, value: 6, cost: 45, upgradePotential: 5 },
                { statLevel: 2, value: 8, cost: 70, upgradePotential: 5 },
            ],
            speed: [
                { statLevel: 1, value: 10, cost: 60, upgradePotential: 5 },
                { statLevel: 2, value: 12, cost: 85, upgradePotential: 5 },
            ],
        },
    },
    [HeroSlug.FATE_PRIEST]: {
        1: {
            attack: [
                { statLevel: 1, value: 9, cost: 45, upgradePotential: 3 },
                { statLevel: 2, value: 11, cost: 70, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 6, cost: 35, upgradePotential: 3 },
                { statLevel: 2, value: 7, cost: 55, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 10, cost: 50, upgradePotential: 3 },
                { statLevel: 2, value: 12, cost: 75, upgradePotential: 3 },
            ],
        },
        2: {
            attack: [
                { statLevel: 1, value: 11, cost: 70, upgradePotential: 5 },
                { statLevel: 2, value: 13, cost: 95, upgradePotential: 5 },
            ],
            defense: [
                { statLevel: 1, value: 7, cost: 55, upgradePotential: 5 },
                { statLevel: 2, value: 9, cost: 80, upgradePotential: 5 },
            ],
            speed: [
                { statLevel: 1, value: 12, cost: 75, upgradePotential: 5 },
                { statLevel: 2, value: 14, cost: 100, upgradePotential: 5 },
            ],
        },
    },
    [HeroSlug.SOUL_SISTERS]: {
        1: {
            attack: [
                { statLevel: 1, value: 11, cost: 55, upgradePotential: 3 },
                { statLevel: 2, value: 13, cost: 80, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 7, cost: 45, upgradePotential: 3 },
                { statLevel: 2, value: 8, cost: 65, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 9, cost: 50, upgradePotential: 3 },
                { statLevel: 2, value: 11, cost: 70, upgradePotential: 3 },
            ],
        },
        2: {
            attack: [
                { statLevel: 1, value: 13, cost: 80, upgradePotential: 5 },
                { statLevel: 2, value: 15, cost: 105, upgradePotential: 5 },
            ],
            defense: [
                { statLevel: 1, value: 8, cost: 65, upgradePotential: 5 },
                { statLevel: 2, value: 10, cost: 90, upgradePotential: 5 },
            ],
            speed: [
                { statLevel: 1, value: 11, cost: 70, upgradePotential: 5 },
                { statLevel: 2, value: 13, cost: 95, upgradePotential: 5 },
            ],
        },
    },
    [HeroSlug.PIRATE]: {
        1: {
            attack: [
                { statLevel: 1, value: 13, cost: 65, upgradePotential: 3 },
                { statLevel: 2, value: 15, cost: 90, upgradePotential: 3 },
            ],
            defense: [
                { statLevel: 1, value: 8, cost: 55, upgradePotential: 3 },
                { statLevel: 2, value: 10, cost: 80, upgradePotential: 3 },
            ],
            speed: [
                { statLevel: 1, value: 10, cost: 60, upgradePotential: 3 },
                { statLevel: 2, value: 12, cost: 85, upgradePotential: 3 },
            ],
        },
        2: {
            attack: [
                { statLevel: 1, value: 15, cost: 90, upgradePotential: 5 },
                { statLevel: 2, value: 17, cost: 120, upgradePotential: 5 },
            ],
            defense: [
                { statLevel: 1, value: 10, cost: 80, upgradePotential: 5 },
                { statLevel: 2, value: 12, cost: 110, upgradePotential: 5 },
            ],
            speed: [
                { statLevel: 1, value: 12, cost: 85, upgradePotential: 5 },
                { statLevel: 2, value: 14, cost: 115, upgradePotential: 5 },
            ],
        },
    },
};
