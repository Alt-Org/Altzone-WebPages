import { HeroSlug } from '../../types/hero';
import { HeroStats, HeroLevel } from '../../types/HeroStats';

export const statsData: Record<HeroSlug, Record<HeroLevel, HeroStats>> = {
    [HeroSlug.HANNU_HODARI]: {
        1: { attack: 10, defense: 5, speed: 7 },
        2: { attack: 12, defense: 6, speed: 8 },
    },
    [HeroSlug.PIRATE]: {
        1: { attack: 15, defense: 7, speed: 6 },
        2: { attack: 17, defense: 8, speed: 7 },
    },

    [HeroSlug.GRAFFITI_ARTIST]: {
        1: { attack: 8, defense: 3, speed: 10 },
        2: { attack: 10, defense: 4, speed: 12 },
    },

    [HeroSlug.CONMAN]: {
        1: { attack: 7, defense: 4, speed: 9 },
        2: { attack: 9, defense: 5, speed: 11 },
    },

    [HeroSlug.RESEARCHER]: {
        1: { attack: 5, defense: 6, speed: 5 },
        2: { attack: 6, defense: 7, speed: 6 },
    },

    [HeroSlug.SOUL_SISTERS]: {
        1: { attack: 9, defense: 8, speed: 7 },
        2: { attack: 11, defense: 9, speed: 8 },
    },

    [HeroSlug.SLEEPER]: {
        1: { attack: 4, defense: 9, speed: 2 },
        2: { attack: 5, defense: 10, speed: 3 },
    },

    [HeroSlug.FATE_PRIEST]: {
        1: { attack: 6, defense: 7, speed: 4 },
        2: { attack: 8, defense: 8, speed: 5 },
    },
};
