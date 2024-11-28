import einstein from '@/shared/assets/images/heros/einstein/einstein.png';
import einsteinGif from '@/shared/assets/images/heros/einstein/einstein-dab_dance.gif';
import hannuHodari from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import hannuHodariGiF from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.gif';
import pirate from '@/shared/assets/images/heros/pirate/pirate.png';
import pirateGif from '@/shared/assets/images/heros/pirate/pirate-catwalk.gif';
import graffittiGaya from '@/shared/assets/images/heros/graffitti-gaya/graffitti-gaya.png';
import graffittiGayaGif from '@/shared/assets/images/heros/graffitti-gaya/grafitti-gaya.gif';
import purpleGirls from '@/shared/assets/images/heros/purple-girls/purple-girls.webp';
import purpleGirlsGif from '@/shared/assets/images/heros/purple-girls/purple-girls-boxing.gif';
import sleeper from '@/shared/assets/images/heros/sleeper/sleeper.webp';
import conman from '@/shared/assets/images/heros/conman/conman.webp';
import fatePriest from '@/shared/assets/images/heros/fate-priest/fate-priest.webp';
import fatePriestGif from '@/shared/assets/images/heros/fate-priest/fate-priest.gif';
import comingSoon from '@/shared/assets/images/heros/ComingSoon.webp';
import red from '@/shared/assets/images/heros/textBgColors/red_cropped.webp';
import yellow from '@/shared/assets/images/heros/textBgColors/yellow.webp';
import orange from '@/shared/assets/images/heros/textBgColors/orange.webp';
import greenBg from '@/shared/assets/images/heros/textBgColors/green2.webp';
import darkBlue from '@/shared/assets/images/heros/textBgColors/dark-blue_cropped.webp';
import purpleBg from '@/shared/assets/images/heros/textBgColors/purple.webp';
import { GroupInfo, HeroGroup, HeroSlug } from '../types/hero';

export const initializeHeroGroups = (t: (key: string) => string): Record<HeroGroup, GroupInfo> => {
    return {
        [HeroGroup.RETROFLECTOR]: {
            name: t('RETROFLECTOR.name'),
            description: t('RETROFLECTOR.description'),
            bgColour: 'rgba(226, 5, 5, 0.5)',
            label: red,
            heroes: [
                {
                    id: 4341,
                    srcImg: hannuHodari,
                    srcGif: hannuHodariGiF,
                    alt: t('RETROFLECTOR.heroes.hannuHodari.alt'),
                    altGif: t('RETROFLECTOR.heroes.hannuHodari.altGif'),
                    title: t('RETROFLECTOR.heroes.hannuHodari.title'),
                    slug: HeroSlug.HANNU_HODARI,
                    description: t('RETROFLECTOR.heroes.hannuHodari.description'),
                    stats: [
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
                },

                {
                    id: 14342,
                    srcImg: pirate,
                    srcGif: pirateGif,
                    alt: t('RETROFLECTOR.heroes.pirate.alt'),
                    altGif: t('RETROFLECTOR.heroes.pirate.altGif'),
                    title: t('RETROFLECTOR.heroes.pirate.title'),
                    slug: HeroSlug.PIRATE,
                    description: t('RETROFLECTOR.heroes.pirate.description'),
                    stats: [
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
                },
            ],
        },

        [HeroGroup.CONFLUENT]: {
            name: t('CONFLUENT.name'),
            description: t('CONFLUENT.description'),
            bgColour: 'rgba(145, 4, 148, 0.5)',
            label: purpleBg,
            heroes: [
                {
                    id: 313213,
                    srcImg: purpleGirls,
                    srcGif: purpleGirlsGif,
                    alt: t('CONFLUENT.heroes.SoulSisters.alt'),
                    altGif: t('CONFLUENT.heroes.SoulSisters.altGif'),
                    slug: HeroSlug.SOUL_SISTERS,
                    title: t('CONFLUENT.heroes.SoulSisters.title'),
                    description: t('CONFLUENT.heroes.SoulSisters.description'),
                    stats: [
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
                },

                {
                    id: 34123,
                    srcImg: sleeper,
                    srcGif: comingSoon,
                    alt: t('CONFLUENT.heroes.Sleeper.alt'),
                    altGif: t('CONFLUENT.heroes.Sleeper.altGif'),
                    slug: HeroSlug.SLEEPER,
                    title: t('CONFLUENT.heroes.Sleeper.title'),
                    description: t('CONFLUENT.heroes.Sleeper.description'),
                    stats: [
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
                },
            ],
        },

        [HeroGroup.PROJECTOR]: {
            name: t('PROJECTOR.name'),
            description: t('PROJECTOR.description'),
            bgColour: 'rgba(254, 237, 1, 0.5)',
            label: yellow,
            heroes: [
                {
                    id: 312314,
                    srcImg: graffittiGaya,
                    srcGif: graffittiGayaGif,
                    alt: t('PROJECTOR.heroes.GraffitiArtist.alt'),
                    altGif: t('PROJECTOR.heroes.GraffitiArtist.altGif'),
                    slug: HeroSlug.GRAFFITI_ARTIST,
                    title: t('PROJECTOR.heroes.GraffitiArtist.title'),
                    description: t('PROJECTOR.heroes.GraffitiArtist.description'),
                    stats: [
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
                },
            ],
        },

        [HeroGroup.INTELLECTUALIZER]: {
            name: t('INTELLECTUALIZER.name'),
            description: t('INTELLECTUALIZER.description'),
            bgColour: 'rgba(51, 3, 147, 0.5)',
            label: darkBlue,
            heroes: [
                {
                    id: 52231233123,
                    srcImg: einstein,
                    srcGif: einsteinGif,
                    alt: t('INTELLECTUALIZER.heroes.Researcher.alt'),
                    altGif: t('INTELLECTUALIZER.heroes.Researcher.altGif'),
                    slug: HeroSlug.RESEARCHER,
                    title: t('INTELLECTUALIZER.heroes.Researcher.title'),
                    description: t('INTELLECTUALIZER.heroes.Researcher.description'),
                    stats: [
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
                },
            ],
        },

        [HeroGroup.TRICKSTER]: {
            name: t('TRICKSTER.name'),
            description: t('TRICKSTER.description'),
            bgColour: 'rgba(47,153,51,0.5)',
            label: greenBg,
            heroes: [
                {
                    id: 522313,
                    srcImg: conman,
                    srcGif: comingSoon,
                    alt: t('TRICKSTER.heroes.Conman.alt'),
                    altGif: t('TRICKSTER.heroes.Conman.altGif'),
                    slug: HeroSlug.CONMAN,
                    title: t('TRICKSTER.heroes.Conman.title'),
                    description: t('TRICKSTER.heroes.Conman.description'),
                    stats: [
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
                            rarityClass: 4,
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
                },
            ],
        },

        [HeroGroup.OBEDIENT]: {
            name: t('OBEDIENT.name'),
            description: t('OBEDIENT.description'),
            bgColour: 'rgba(240,153,0,0.7)',
            label: orange,
            heroes: [
                {
                    id: 524234,
                    srcImg: fatePriest,
                    srcGif: fatePriestGif,
                    alt: t('OBEDIENT.heroes.FatePriest.alt'),
                    altGif: t('OBEDIENT.heroes.FatePriest.altGif'),
                    slug: HeroSlug.FATE_PRIEST,
                    title: t('OBEDIENT.heroes.FatePriest.title'),
                    description: t('OBEDIENT.heroes.FatePriest.description'),
                    stats: [
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
                },
            ],
        },
    };
};
